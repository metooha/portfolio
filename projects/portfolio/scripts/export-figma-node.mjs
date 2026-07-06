#!/usr/bin/env node
/**
 * Export a Figma node via the local Figma Desktop MCP server (localhost:3845).
 * Usage: node scripts/export-figma-node.mjs <nodeId> <outputPath> [scale]
 * Example: node scripts/export-figma-node.mjs 3728:36088 src/app/assets/pages/case-study/airtable-sot/cover.png 2
 */

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const MCP_URL = "http://127.0.0.1:3845/mcp";
const nodeId = process.argv[2];
const outputPath = resolve(process.argv[3] ?? "cover.png");
const scale = Number(process.argv[4] ?? 2);

if (!nodeId) {
  console.error("Usage: node scripts/export-figma-node.mjs <nodeId> <outputPath> [scale]");
  process.exit(1);
}

let sessionId;

async function mcpCall(method, params = {}) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json, text/event-stream",
  };
  if (sessionId) headers["Mcp-Session-Id"] = sessionId;

  const res = await fetch(MCP_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ jsonrpc: "2.0", id: Date.now(), method, params }),
  });

  const nextSession = res.headers.get("mcp-session-id");
  if (nextSession) sessionId = nextSession;

  const text = await res.text();
  for (const line of text.split("\n")) {
    if (!line.startsWith("data: ")) continue;
    const payload = JSON.parse(line.slice(6));
    if (payload.error) throw new Error(payload.error.message ?? JSON.stringify(payload.error));
    if (payload.result !== undefined) return payload.result;
  }
  throw new Error(`No MCP result in response: ${text.slice(0, 500)}`);
}

function extractImageBuffer(result) {
  if (!result?.content?.length) throw new Error("Empty MCP tool result");

  for (const item of result.content) {
    if (item.type === "image" && item.data) {
      return Buffer.from(item.data, item.mimeType?.includes("png") ? "base64" : "base64");
    }
    if (item.type === "text" && item.text?.startsWith("data:image")) {
      const base64 = item.text.split(",")[1];
      return Buffer.from(base64, "base64");
    }
    if (item.type === "text") {
      try {
        const parsed = JSON.parse(item.text);
        if (parsed?.url) return { url: parsed.url };
        if (parsed?.base64) return Buffer.from(parsed.base64, "base64");
      } catch {
        // not json
      }
    }
  }

  throw new Error(`Unsupported MCP image payload: ${JSON.stringify(result.content).slice(0, 400)}`);
}

async function main() {
  await mcpCall("initialize", {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: { name: "portfolio-export", version: "1.0.0" },
  });

  const result = await mcpCall("tools/call", {
    name: "get_screenshot",
    arguments: { nodeId },
  });

  const image = extractImageBuffer(result);
  if (image.url) {
    const res = await fetch(image.url);
    if (!res.ok) throw new Error(`Failed to download ${image.url}: ${res.status}`);
    writeFileSync(outputPath, Buffer.from(await res.arrayBuffer()));
  } else {
    writeFileSync(outputPath, image);
  }

  console.log(`Exported ${nodeId} → ${outputPath}`);
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
