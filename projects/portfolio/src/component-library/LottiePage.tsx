import * as React from 'react';
import Lottie from 'lottie-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { PageWrapper, ExampleSection } from './shared';
import { SearchBar } from '@/app/components/SearchBar/SearchBar';
import { Body, Caption } from '@/app/components/Text/Text';
import manifest from '@/app/assets/walmart-assets/lottie/manifest.json';
import { LOTTIE_DATA, LOTTIE_FORMATS, LOTTIE_TOKENS } from '@/app/assets/walmart-assets/lottie/index';

type ManifestItem = {
  name: string;
  tokenName: string;
  format: 'lottie' | 'json';
  size: number;
};

// ─── Copy utility ───────────────────────────────────────────────

function useCopy(value: string) {
  const [copied, setCopied] = React.useState(false);
  const copy = React.useCallback(() => {
    if (!value) return;
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [value]);
  return { copied, copy };
}

// ─── Lottie Player ──────────────────────────────────────────────

function LottiePlayer({ name, format }: { name: string; format: 'lottie' | 'json' }) {
  const raw = LOTTIE_DATA[name];

  if (!raw) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        padding: '12px',
      }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"
            fill="#C0C0C6" />
        </svg>
        <Caption size="small" color="subtle" style={{ textAlign: 'center', lineHeight: 1.3 }}>
          Pending download
        </Caption>
      </div>
    );
  }

  if (format === 'json') {
    let animationData: unknown = null;
    try { animationData = JSON.parse(raw); } catch { /* invalid */ }
    if (animationData) {
      return (
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{ width: '100%', height: '100%' }}
        />
      );
    }
  }

  // dotLottie binary: pass as data URL to DotLottieReact
  const src = `data:application/zip;base64,${raw}`;
  return (
    <DotLottieReact
      src={src}
      autoplay
      loop
      style={{ width: '100%', height: '100%' }}
    />
  );
}

// ─── Card ────────────────────────────────────────────────────────

function LottieCard({ item }: { item: ManifestItem }) {
  const tokenName = LOTTIE_TOKENS[item.name] ?? item.tokenName;
  const format = LOTTIE_FORMATS[item.name] ?? item.format;
  const hasData = !!LOTTIE_DATA[item.name];
  const { copied, copy } = useCopy(tokenName);

  const sizeKb = item.size ? `${(item.size / 1024).toFixed(1)} KB` : null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        border: '1px solid #E6E6E8',
        overflow: 'hidden',
        background: '#FAFAFA',
        transition: 'box-shadow 0.15s ease',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
    >
      {/* Preview area */}
      <div
        style={{
          height: '160px',
          background: hasData ? '#F0F4FF' : '#F5F5F7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <LottiePlayer name={item.name} format={format} />
        {/* Format badge */}
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: format === 'lottie' ? '#0071CE' : '#2E7D32',
          color: '#fff',
          borderRadius: '4px',
          padding: '2px 6px',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
        }}>
          .{format}
        </div>
      </div>

      {/* Info area */}
      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Body as="p" size="medium" weight="alt" style={{ margin: 0, wordBreak: 'break-all' }}>
          {item.name}
        </Body>

        <button
          type="button"
          onClick={copy}
          title="Copy token name"
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Caption
            size="small"
            color="subtle"
            style={{
              fontFamily: 'monospace',
              fontSize: '10px',
              wordBreak: 'break-all',
              lineHeight: 1.3,
            }}
          >
            {copied ? '✓ Copied!' : tokenName}
          </Caption>
        </button>

        {sizeKb && (
          <Caption size="small" color="subtle">
            {sizeKb}
          </Caption>
        )}
      </div>
    </div>
  );
}

// ─── Empty State ─────────────────────────────────────────────────

function EmptyState() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        padding: '80px 24px',
        textAlign: 'center',
      }}
    >
      {/* Animated placeholder */}
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #E8F0FE 0%, #C8DCF7 50%, #E8F0FE 100%)',
        backgroundSize: '200% 200%',
        animation: 'lottiePulse 2s ease-in-out infinite',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            stroke="#0071CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <style>{`@keyframes lottiePulse { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }`}</style>

      <div>
        <Body as="p" size="large" weight="alt" style={{ margin: '0 0 8px' }}>
          Lottie animations pending download
        </Body>
        <Body as="p" size="medium" color="subtle" style={{ margin: 0, maxWidth: '480px', lineHeight: 1.6 }}>
          The corporate web proxy blocks binary file downloads. Run{' '}
          <code style={{ background: '#F0F0F2', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>
            npm run airtable:pull-lottie
          </code>{' '}
          from outside the corporate network (or with a proxy bypass) to cache the{' '}
          <code style={{ background: '#F0F0F2', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>
            .lottie
          </code>{' '}
          files locally.
        </Body>
      </div>

      <div
        style={{
          background: '#F5F5F7',
          borderRadius: '10px',
          padding: '16px 20px',
          textAlign: 'left',
          maxWidth: '480px',
          width: '100%',
        }}
      >
        <Caption size="small" weight="alt" style={{ display: 'block', marginBottom: '8px', color: '#74767C' }}>
          PUBLISHED TOKENS IN AIRTABLE
        </Caption>
        {['ld-primitive-lottie-martyEmotes', 'ld-primitive-lottie-wibeyEmotes'].map((t) => (
          <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0071CE', flexShrink: 0 }} />
            <Caption size="small" style={{ fontFamily: 'monospace', color: '#2E2F32' }}>{t}</Caption>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────

export default function LottiePage() {
  const [search, setSearch] = React.useState('');
  const items = (manifest as { count: number; items: ManifestItem[] }).items;
  const normalizedSearch = search.trim().toLowerCase();
  const filtered = normalizedSearch
    ? items.filter(
        (item) =>
          item.name.toLowerCase().includes(normalizedSearch) ||
          item.tokenName.toLowerCase().includes(normalizedSearch),
      )
    : items;

  return (
    <PageWrapper
      title="Lottie Animations"
      category="Media"
      description="Lottie and dotLottie animation assets from the Component Library Airtable ANIMATE tokens. Each animation ships as base64-encoded data ready for use with @lottiefiles/dotlottie-react or lottie-web."
    >
      <ExampleSection>
        {items.length > 0 && (
          <div
            style={{
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <SearchBar
              placeholder={`Search ${items.length} animation${items.length !== 1 ? 's' : ''}...`}
              value={search}
              onChange={setSearch}
              onClear={() => setSearch('')}
              UNSAFE_style={{ width: '100%', maxWidth: '400px' }}
            />
            <Body as="span" size="small" color="subtle">
              {normalizedSearch
                ? `${filtered.length} of ${items.length} animations`
                : `${items.length} animation${items.length !== 1 ? 's' : ''}`}
            </Body>
          </div>
        )}

        {items.length === 0 ? (
          <EmptyState />
        ) : filtered.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center' }}>
            <Body as="p" size="medium" color="subtle" style={{ margin: 0 }}>
              No animations match "{search}"
            </Body>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '16px',
            }}
          >
            {filtered.map((item) => (
              <LottieCard key={item.name} item={item} />
            ))}
          </div>
        )}
      </ExampleSection>
    </PageWrapper>
  );
}
