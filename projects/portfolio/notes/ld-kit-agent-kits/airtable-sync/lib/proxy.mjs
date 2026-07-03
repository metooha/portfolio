/**
 * HTTPS proxy + corporate TLS wiring for Airtable sync downloads.
 *
 * Node 20's built-in `fetch` does not honour `HTTPS_PROXY` by default, and
 * most attachment downloads (e.g. `v5.airtableusercontent.com`) need to
 * traverse Walmart's corporate egress proxy — the host is blocked at the
 * DNS layer and only resolves through the proxy's upstream DNS. On top of
 * that, the proxy does TLS interception, re-signing every response with a
 * private `WalmartRootCA-*` root, so Node has to trust those roots too.
 *
 * This module:
 *   1. Detects a proxy (env vars > macOS PAC auto-detection).
 *   2. Builds a CA bundle from the Walmart roots in the system keychain
 *      and from the live proxy handshake's chain (captured via openssl).
 *   3. Installs an undici `ProxyAgent` as the global dispatcher, passing
 *      the CA bundle through `requestTls` / `connect` so intercepted
 *      responses validate against the corporate chain.
 *   4. Exports the proxy + `NODE_EXTRA_CA_CERTS` into the process env so
 *      nested tools (Airtable SDK, shell helpers) pick them up too.
 */

import { execFileSync, execSync } from 'child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { PATHS } from '../config.mjs';

const WALMART_DEFAULT_PROXY = 'http://proxy-intlho.wal-mart.com:8080';
const CA_BUNDLE_FILENAME = 'walmart-ca-bundle.pem';

function readEnvProxy() {
  return (
    process.env.HTTPS_PROXY ||
    process.env.https_proxy ||
    process.env.HTTP_PROXY ||
    process.env.http_proxy ||
    null
  );
}

function looksLikeWalmartMacProxy() {
  if (process.platform !== 'darwin') return false;
  try {
    const out = execSync('scutil --proxy', {
      encoding: 'utf8',
      timeout: 2000,
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    return /wal-mart\.com/i.test(out) && /ProxyAutoConfigEnable\s*:\s*1/.test(out);
  } catch {
    return false;
  }
}

function safeExec(cmd, args, { timeout = 3000 } = {}) {
  try {
    return execFileSync(cmd, args, {
      encoding: 'utf8',
      timeout,
      stdio: ['ignore', 'pipe', 'ignore'],
    });
  } catch {
    return '';
  }
}

/**
 * Extract the published Walmart root/intermediate certs from the macOS
 * keychain by name. We pull each cert individually (no `-a`) because the
 * keychain sometimes blocks `-a` under sandbox restrictions.
 */
function exportWalmartCertsFromKeychain() {
  if (process.platform !== 'darwin') return '';
  const names = [
    'WalmartRootCA-SHA256',
    'WalmartRootCA-RSA-SHA256-2021',
    'WalmartIntermediateCA01-SHA256',
    'WalmartIntermediateCA02-SHA256',
    'WalmartIntermediateCA-RSA-SHA256-2021',
    'WalmartIssuingCA-2FA-01-SHA256',
    'WalmartIssuingCA-2FA-02-SHA256',
    'WalmartIssuingCA-TLS-01-SHA256',
    'WalmartIssuingCA-TLS-02-SHA256',
  ];
  const parts = [];
  for (const name of names) {
    const pem = safeExec('security', [
      'find-certificate',
      '-c',
      name,
      '-p',
      '/Library/Keychains/System.keychain',
    ]);
    if (pem && pem.includes('BEGIN CERTIFICATE')) parts.push(pem.trim());
  }
  return parts.join('\n');
}

/**
 * Capture whatever chain the proxy currently presents for a sentinel host.
 * This hedges against root-CA renewals — if Walmart swaps to a new root,
 * we still end up trusting it as long as it's in the live handshake.
 */
function captureProxyChain(proxyUrl) {
  // openssl s_client needs host:port form for -proxy.
  let proxyHostPort;
  try {
    const u = new URL(proxyUrl);
    proxyHostPort = `${u.hostname}:${u.port || 8080}`;
  } catch {
    return '';
  }

  const sentinel = 'v5.airtableusercontent.com';
  const raw = safeExec(
    'sh',
    [
      '-c',
      `echo "" | openssl s_client -connect ${sentinel}:443 -proxy ${proxyHostPort} -servername ${sentinel} -showcerts 2>/dev/null`,
    ],
    { timeout: 8000 },
  );
  if (!raw) return '';

  // Keep only the BEGIN/END CERTIFICATE blocks.
  const matches = raw.match(/-----BEGIN CERTIFICATE-----[\s\S]*?-----END CERTIFICATE-----/g);
  return matches ? matches.join('\n') : '';
}

function buildCaBundle(proxyUrl) {
  const keychainPem = exportWalmartCertsFromKeychain();
  const chainPem = captureProxyChain(proxyUrl);
  const combined = [keychainPem, chainPem].filter(Boolean).join('\n');
  if (!combined.includes('BEGIN CERTIFICATE')) return '';
  return combined.trim() + '\n';
}

function writeCaBundle(pem) {
  mkdirSync(PATHS.cacheDir, { recursive: true });
  const p = resolve(PATHS.cacheDir, CA_BUNDLE_FILENAME);
  writeFileSync(p, pem);
  return p;
}

// ── NTLM helpers ────────────────────────────────────────────────────────────

/** Build an NTLM Type-1 Negotiate message (no credentials needed). */
function ntlmType1() {
  const buf = Buffer.alloc(40);
  Buffer.from('NTLMSSP\0').copy(buf, 0);           // signature
  buf.writeUInt32LE(1, 8);                          // MessageType = 1
  buf.writeUInt32LE(0xa0088207, 12);                // NegotiateFlags
  // Domain / Workstation security buffers (empty, offset 32)
  buf.writeUInt16LE(0, 16); buf.writeUInt16LE(0, 18); buf.writeUInt32LE(40, 20);
  buf.writeUInt16LE(0, 24); buf.writeUInt16LE(0, 26); buf.writeUInt32LE(40, 28);
  // Version: 6.1 build 7600
  buf.writeUInt8(6, 32); buf.writeUInt8(1, 33); buf.writeUInt16LE(7600, 34);
  buf.writeUInt8(0x0f, 39);
  return buf;
}

/** Parse NTLM Type-2 Challenge from base64 string, return { challenge, flags }. */
function ntlmParseType2(b64) {
  const buf = Buffer.from(b64, 'base64');
  const flags = buf.readUInt32LE(20);
  const challenge = buf.slice(24, 32);
  return { challenge, flags };
}

/** Build NTLM Type-3 Authenticate message using NTLMv2. */
async function ntlmType3Async(username, password, domain, type2) {
  const { createHash, createHmac, randomBytes } = await import('crypto');
  const { challenge } = type2;

  // NT hash
  const ntHash = createHash('md4').update(Buffer.from(password, 'utf16le')).digest();

  // NTLMv2 hash
  const ntlmv2Hash = createHmac('md5', ntHash)
    .update(Buffer.from((username.toUpperCase() + domain.toUpperCase()), 'utf16le'))
    .digest();

  // Client challenge + timestamp (8 zero bytes is accepted by most proxies)
  const clientChallenge = randomBytes(8);
  const timestamp = Buffer.alloc(8);

  // TargetInfo: MsvAvEOL only (minimal)
  const targetInfo = Buffer.from([0x00, 0x00, 0x00, 0x00]);

  // NTLMv2 Blob
  const blob = Buffer.concat([
    Buffer.from([0x01, 0x01, 0x00, 0x00]),  // RespType, HiRespType
    Buffer.from([0x00, 0x00, 0x00, 0x00]),  // Reserved
    timestamp,
    clientChallenge,
    Buffer.from([0x00, 0x00, 0x00, 0x00]),  // Reserved
    targetInfo,
  ]);

  const proofStr = createHmac('md5', ntlmv2Hash)
    .update(Buffer.concat([challenge, blob]))
    .digest();
  const ntResponse = Buffer.concat([proofStr, blob]);

  // LM response = 24 zero bytes (disabled in NTLMv2)
  const lmResponse = Buffer.alloc(24, 0);

  const domainBuf    = Buffer.from(domain.toUpperCase(), 'utf16le');
  const usernameBuf  = Buffer.from(username, 'utf16le');
  const workstation  = Buffer.from('WORKSTATION', 'utf16le');
  const sessionKey   = Buffer.alloc(0);
  const flags        = Buffer.alloc(4); flags.writeUInt32LE(0xa0088207, 0);

  // Calculate offsets
  const headerSize = 72; // fixed header
  let off = headerSize;

  const lmOff   = off; off += lmResponse.length;
  const ntOff   = off; off += ntResponse.length;
  const domOff  = off; off += domainBuf.length;
  const userOff = off; off += usernameBuf.length;
  const wsOff   = off; off += workstation.length;
  const skOff   = off;

  const msg = Buffer.alloc(off);
  Buffer.from('NTLMSSP\0').copy(msg, 0);
  msg.writeUInt32LE(3, 8);                          // MessageType = 3
  // LmChallengeResponseFields (12)
  msg.writeUInt16LE(lmResponse.length, 12); msg.writeUInt16LE(lmResponse.length, 14); msg.writeUInt32LE(lmOff, 16);
  // NtChallengeResponseFields (20)
  msg.writeUInt16LE(ntResponse.length, 20); msg.writeUInt16LE(ntResponse.length, 22); msg.writeUInt32LE(ntOff, 24);
  // DomainNameFields (28)
  msg.writeUInt16LE(domainBuf.length, 28); msg.writeUInt16LE(domainBuf.length, 30); msg.writeUInt32LE(domOff, 32);
  // UserNameFields (36)
  msg.writeUInt16LE(usernameBuf.length, 36); msg.writeUInt16LE(usernameBuf.length, 38); msg.writeUInt32LE(userOff, 40);
  // WorkstationFields (44)
  msg.writeUInt16LE(workstation.length, 44); msg.writeUInt16LE(workstation.length, 46); msg.writeUInt32LE(wsOff, 48);
  // EncryptedRandomSessionKeyFields (52)
  msg.writeUInt16LE(0, 52); msg.writeUInt16LE(0, 54); msg.writeUInt32LE(skOff, 56);
  // NegotiateFlags (60)
  flags.copy(msg, 60);
  // Version (64): 6.1 build 7600
  msg.writeUInt8(6, 64); msg.writeUInt8(1, 65); msg.writeUInt16LE(7600, 66);
  msg.writeUInt8(0x0f, 71);

  // Payload
  lmResponse.copy(msg, lmOff);
  ntResponse.copy(msg, ntOff);
  domainBuf.copy(msg, domOff);
  usernameBuf.copy(msg, userOff);
  workstation.copy(msg, wsOff);

  return msg;
}

/**
 * Send CONNECT through proxy with NTLM handshake.
 * Returns a raw net.Socket that is an authenticated tunnel to targetHost:targetPort.
 */
async function ntlmConnect(proxyHost, proxyPort, targetHost, targetPort, username, password, domain) {
  const net = await import('net');

  const sendConnect = (socket, ntlmToken) => new Promise((res, rej) => {
    const authHeader = ntlmToken
      ? `Proxy-Authorization: NTLM ${ntlmToken.toString('base64')}\r\n`
      : '';
    socket.write(
      `CONNECT ${targetHost}:${targetPort} HTTP/1.1\r\n` +
      `Host: ${targetHost}:${targetPort}\r\n` +
      authHeader +
      'Proxy-Connection: keep-alive\r\n' +
      '\r\n'
    );

    let buf = '';
    const onData = (chunk) => {
      buf += chunk.toString('binary');
      const end = buf.indexOf('\r\n\r\n');
      if (end === -1) return;
      socket.removeListener('data', onData);
      socket.removeListener('error', onErr);
      const headerPart = buf.slice(0, end);
      const statusLine = headerPart.split('\r\n')[0];
      const code = parseInt(statusLine.split(' ')[1], 10);
      const headers = {};
      for (const line of headerPart.split('\r\n').slice(1)) {
        const [k, ...v] = line.split(':');
        if (k) headers[k.toLowerCase().trim()] = v.join(':').trim();
      }
      res({ code, headers });
    };
    const onErr = (e) => { socket.removeListener('data', onData); rej(e); };
    socket.on('data', onData);
    socket.on('error', onErr);
  });

  return new Promise((resolve, reject) => {
    const socket = net.createConnection({ host: proxyHost, port: proxyPort }, async () => {
      try {
        // Step 1: send CONNECT with NTLM Type 1
        const type1 = ntlmType1();
        const resp1 = await sendConnect(socket, type1);

        if (resp1.code === 200) { resolve(socket); return; }

        if (resp1.code !== 407) {
          reject(new Error(`Proxy CONNECT failed: ${resp1.code}`)); return;
        }

        // Step 2: parse NTLM Type 2 challenge
        const authHeader = resp1.headers['proxy-authenticate'] || '';
        const ntlmToken2 = authHeader.split(' ')[1];
        if (!ntlmToken2) { reject(new Error('No NTLM token in 407 response')); return; }

        const type2 = ntlmParseType2(ntlmToken2);

        // Step 3: build Type 3 response
        const type3 = await ntlmType3Async(username, password, domain, type2);
        const resp2 = await sendConnect(socket, type3);

        if (resp2.code === 200) { resolve(socket); return; }
        reject(new Error(`NTLM auth failed: ${resp2.code} — check PROXY_USER/PROXY_PASS`));
      } catch (e) { reject(e); }
    });
    socket.on('error', reject);
    socket.setTimeout(15000, () => { socket.destroy(); reject(new Error('Proxy CONNECT timeout')); });
  });
}

let applied = false;

/**
 * Low-level HTTPS downloader that bypasses the global undici dispatcher.
 *
 * When PROXY_USER + PROXY_PASS are set in .env, performs a full NTLM
 * handshake over a raw TCP tunnel so corporate McAfee proxies let through.
 *
 * Falls back to global fetch() when no proxy is configured.
 */
export async function proxyFetch(url) {
  const proxyUrl =
    process.env.HTTPS_PROXY ||
    process.env.HTTP_PROXY ||
    (looksLikeWalmartMacProxy() ? WALMART_DEFAULT_PROXY : null);

  if (!proxyUrl) return fetch(url);

  const proxyUser = process.env.PROXY_USER || process.env.PROXY_USERNAME || '';
  const proxyPass = process.env.PROXY_PASS || process.env.PROXY_PASSWORD || '';
  const proxyDomain = process.env.PROXY_DOMAIN || 'WALMART';

  const caPath = process.env.NODE_EXTRA_CA_CERTS;
  let ca;
  if (caPath) {
    try { ca = (await import('fs')).readFileSync(caPath, 'utf8'); } catch { /* ignore */ }
  }

  // ── Path A: NTLM credentials available — manual TCP CONNECT tunnel ───────
  if (proxyUser && proxyPass) {
    const pUrl = new URL(proxyUrl);
    const tls  = await import('tls');
    const tUrl = new URL(url);
    const targetHost = tUrl.hostname;
    const targetPort = parseInt(tUrl.port || '443', 10);

    const rawSocket = await ntlmConnect(
      pUrl.hostname, parseInt(pUrl.port || '8080', 10),
      targetHost, targetPort,
      proxyUser, proxyPass, proxyDomain
    );

    // Upgrade to TLS over the established tunnel
    const tlsSocket = await new Promise((res, rej) => {
      const s = tls.connect({
        socket: rawSocket,
        host: targetHost,
        servername: targetHost,
        ...(ca ? { ca } : {}),
      });
      s.on('secureConnect', () => res(s));
      s.on('error', rej);
      s.setTimeout(20000, () => { s.destroy(); rej(new Error('TLS timeout')); });
    });

    // Send HTTP/1.1 GET through the TLS tunnel
    return new Promise((resolve, reject) => {
      const path = tUrl.pathname + tUrl.search;
      tlsSocket.write(
        `GET ${path} HTTP/1.1\r\n` +
        `Host: ${targetHost}\r\n` +
        'Connection: close\r\n' +
        '\r\n'
      );

      let raw = Buffer.alloc(0);
      tlsSocket.on('data', c => { raw = Buffer.concat([raw, c]); });
      tlsSocket.on('end', () => {
        const sep = raw.indexOf('\r\n\r\n');
        if (sep === -1) { reject(new Error('Bad HTTP response')); return; }
        const headerStr = raw.slice(0, sep).toString('utf-8');
        const body = raw.slice(sep + 4);
        const statusLine = headerStr.split('\r\n')[0];
        const status = parseInt(statusLine.split(' ')[1], 10);
        const statusText = statusLine.split(' ').slice(2).join(' ');
        const hdrs = {};
        for (const line of headerStr.split('\r\n').slice(1)) {
          const [k, ...v] = line.split(':');
          if (k) hdrs[k.toLowerCase().trim()] = v.join(':').trim();
        }
        resolve({
          ok: status >= 200 && status < 300,
          status,
          statusText,
          headers: { get: (k) => hdrs[k.toLowerCase()] ?? null },
          text: () => Promise.resolve(body.toString('utf-8')),
          arrayBuffer: () => Promise.resolve(body.buffer.slice(body.byteOffset, body.byteOffset + body.byteLength)),
          json: () => Promise.resolve(JSON.parse(body.toString('utf-8'))),
        });
      });
      tlsSocket.on('error', reject);
    });
  }

  // ── Path B: No credentials — try native https-proxy-agent for clear error ─
  let AgentClass;
  try {
    const mod = await import('https-proxy-agent');
    AgentClass = mod.HttpsProxyAgent || mod.default;
  } catch {
    return fetch(url);
  }

  const agent = new AgentClass(proxyUrl, ca ? { ca } : {});
  const https = await import('https');
  const urlObj = new URL(url);

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: urlObj.hostname,
      port: urlObj.port || 443,
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      agent,
      timeout: 30000,
      ...(ca ? { ca } : {}),
    }, (resp) => {
      if (resp.statusCode === 407) {
        resp.resume();
        reject(new Error(
          `HTTP 407 Proxy Authentication Required (NTLM).\n` +
          `  Add these to your airtable-sync/.env file and retry:\n` +
          `    PROXY_USER=${process.env.USER || 'your_username'}\n` +
          `    PROXY_PASS=your_domain_password`
        ));
        return;
      }
      const chunks = [];
      resp.on('data', c => chunks.push(c));
      resp.on('end', () => {
        const body = Buffer.concat(chunks);
        resolve({
          ok: resp.statusCode >= 200 && resp.statusCode < 300,
          status: resp.statusCode,
          statusText: resp.statusMessage || String(resp.statusCode),
          headers: { get: (k) => resp.headers[k.toLowerCase()] ?? null },
          text: () => Promise.resolve(body.toString('utf-8')),
          arrayBuffer: () => Promise.resolve(body.buffer.slice(body.byteOffset, body.byteOffset + body.byteLength)),
          json: () => Promise.resolve(JSON.parse(body.toString('utf-8'))),
        });
      });
      resp.on('error', reject);
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Request timeout')); });
    req.end();
  });
}

/**
 * Install a global undici ProxyAgent for fetch() if a proxy is configured.
 * Idempotent — safe to call more than once (only the first call applies).
 */
export async function setupProxy({ verbose = false } = {}) {
  if (applied) return null;

  let proxyUrl = readEnvProxy();
  let source = proxyUrl ? 'env' : null;

  if (!proxyUrl && looksLikeWalmartMacProxy()) {
    proxyUrl = WALMART_DEFAULT_PROXY;
    source = 'macOS PAC';
  }

  if (!proxyUrl) return null;

  let ProxyAgent;
  let setGlobalDispatcher;
  try {
    ({ ProxyAgent, setGlobalDispatcher } = await import('undici'));
  } catch {
    console.warn(
      `  Proxy requested (${proxyUrl}) but the 'undici' package is not installed — attachment downloads may fail.`,
    );
    return null;
  }

  // Build / refresh the CA bundle whenever we use the Walmart proxy. The
  // bundle is cheap (<10 KB) and only touched during `airtable:pull*`.
  let caPath = process.env.NODE_EXTRA_CA_CERTS || null;
  let caPem = null;
  const looksCorporate =
    /wal-mart\.com/i.test(proxyUrl) || source === 'macOS PAC';
  if (looksCorporate) {
    try {
      const bundle = buildCaBundle(proxyUrl);
      if (bundle) {
        caPath = writeCaBundle(bundle);
        caPem = bundle;
      }
    } catch {
      /* best-effort — fall back to system trust */
    }
  }
  if (!caPem && caPath && existsSync(caPath)) {
    try { caPem = readFileSync(caPath, 'utf8'); } catch { /* ignore */ }
  }

  const agentOpts = { uri: proxyUrl };
  if (caPem) {
    agentOpts.requestTls = { ca: caPem };
    agentOpts.connect = { ca: caPem };
    agentOpts.proxyTls = { ca: caPem };
  }
  setGlobalDispatcher(new ProxyAgent(agentOpts));
  applied = true;

  // Propagate into env for child tooling (curl, Airtable SDK, etc).
  if (!process.env.HTTPS_PROXY) process.env.HTTPS_PROXY = proxyUrl;
  if (!process.env.HTTP_PROXY) process.env.HTTP_PROXY = proxyUrl;
  if (caPath && !process.env.NODE_EXTRA_CA_CERTS) {
    process.env.NODE_EXTRA_CA_CERTS = caPath;
  }

  if (verbose) {
    const caNote = caPem ? ` (+corporate CA bundle)` : '';
    console.log(`  Network: routing fetch() via ${proxyUrl} (${source})${caNote}`);
  }
  return proxyUrl;
}
