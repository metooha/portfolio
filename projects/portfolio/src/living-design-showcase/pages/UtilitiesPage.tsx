import * as React from 'react';
import {Body, Caption, Heading} from '@/living-design/components/Text/Text';
import {Icon} from '@/living-design/components/Icons/Icons';
import {PageWrapper} from './shared';

import {
  THEME_PRESETS,
  THEME_FONT_CONFIG,
  getTheme,
  setTheme,
  getMegaMode,
  setMegaMode,
  MEGA_CHANGE_EVENT,
} from '@/living-design/utils/themeManager';
import {
  getThemePrimaryIconFont,
  getThemeIconCssPrefix,
  listIcons,
  hasIcon,
  searchIcons,
  getIconsForTheme,
  getCommonIcons,
  getIconFontInfo,
  listIconFonts,
} from '@/living-design/utils/iconManager';
import {
  Illustration,
  listIllustrationTypes,
  listIllustrations,
  searchIllustrations,
  getIllustrationTypeInfo,
} from '@/living-design/utils/illustrationManager';
import {
  listTenants,
  getTenantInfo,
  getMedia,
  hasMedia,
  listMedia,
  getMediaTenantForTheme,
  useThemeMediaTenant,
  THEME_MEDIA_TENANT,
  type MediaTenant,
} from '@/living-design/utils/mediaManager';
import {getCurrentTheme, type ThemeName} from '@/living-design/utils/Theming';

/* ── Live theme subscription ──────────────────────────────────── */

function useLiveTheme(): ThemeName {
  const [theme, setT] = React.useState<ThemeName>(() => getCurrentTheme());
  React.useEffect(() => {
    const handler = (e: Event) => {
      const next = (e as CustomEvent).detail?.theme as ThemeName | undefined;
      if (next) setT(next);
    };
    window.addEventListener('ld-kit-theme-change', handler);
    return () => window.removeEventListener('ld-kit-theme-change', handler);
  }, []);
  return theme;
}

/* ── Shared bits ──────────────────────────────────────────────── */

const MONO = "ui-monospace, SFMono-Regular, Menlo, Monaco, 'Courier New', monospace";

function Card({children, id}: {children: React.ReactNode; id?: string}) {
  return (
    <section
      id={id}
      style={{
        border: '1px solid #E6E6E8',
        borderRadius: '12px',
        background: '#ffffff',
        overflow: 'hidden',
      }}
    >
      {children}
    </section>
  );
}

function CardHeader({title}: {title: string}) {
  return (
    <div style={{padding: '20px 24px 16px', borderBottom: '1px solid #F2F3F5'}}>
      <Heading as="h2" size="medium" style={{margin: 0}}>
        {title}
      </Heading>
    </div>
  );
}

function CardBody({children}: {children: React.ReactNode}) {
  return <div style={{padding: '20px 24px 24px', display: 'grid', gap: '20px'}}>{children}</div>;
}

function Stat({label, value, accent}: {label: string; value: React.ReactNode; accent?: string}) {
  return (
    <div style={{border: '1px solid #E6E6E8', borderRadius: '8px', padding: '12px 14px', background: '#FAFAFB'}}>
      <Caption as="p" style={{margin: '0 0 4px', color: '#74767C', textTransform: 'uppercase', letterSpacing: '0.4px', fontSize: '10px', fontWeight: 700}}>
        {label}
      </Caption>
      <div style={{fontFamily: MONO, fontSize: '18px', fontWeight: 600, color: accent ?? '#0F172A', lineHeight: 1.2}}>
        {value}
      </div>
    </div>
  );
}

function StatRow({children}: {children: React.ReactNode}) {
  return <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px'}}>{children}</div>;
}

function SearchInput({value, onChange, placeholder}: {value: string; onChange: (v: string) => void; placeholder: string}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%',
        maxWidth: '360px',
        padding: '8px 12px',
        fontSize: '13px',
        border: '1px solid #E6E6E8',
        borderRadius: '6px',
        outline: 'none',
        fontFamily: MONO,
      }}
    />
  );
}

/* ── 1. themeManager ─────────────────────────────────────────── */

function ThemeManagerDemo() {
  const activeTheme = useLiveTheme();
  const [mega, setMega] = React.useState(getMegaMode());
  const preset = THEME_PRESETS[activeTheme];
  const fontConfig = THEME_FONT_CONFIG[activeTheme];

  React.useEffect(() => {
    const onMega = (e: Event) => {
      const enabled = (e as CustomEvent).detail?.enabled;
      if (typeof enabled === 'boolean') setMega(enabled);
    };
    window.addEventListener(MEGA_CHANGE_EVENT, onMega);
    return () => window.removeEventListener(MEGA_CHANGE_EVENT, onMega);
  }, []);

  const themeNames = Object.keys(THEME_PRESETS);

  return (
    <Card id="theme-manager">
      <CardHeader title="Theme Manager" />
      <CardBody>
        <StatRow>
          <Stat label="getTheme()" value={`"${activeTheme}"`} accent={preset.primaryColor} />
          <Stat label="primaryColor" value={
            <span style={{display: 'inline-flex', alignItems: 'center', gap: '8px'}}>
              <span style={{width: 14, height: 14, borderRadius: 4, background: preset.primaryColor, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)'}} />
              {preset.primaryColor}
            </span>
          } />
          <Stat label="textFont" value={fontConfig?.textFont ?? '—'} />
          <Stat label="getMegaMode()" value={mega ? 'true' : 'false'} />
        </StatRow>

        <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center'}}>
          <select
            value={activeTheme}
            onChange={(e) => { setTheme(e.target.value); }}
            style={{padding: '6px 10px', fontFamily: MONO, fontSize: '12px', border: '1px solid #E6E6E8', borderRadius: '6px', background: '#fff'}}
            aria-label="Change theme"
          >
            {themeNames.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
          <button
            type="button"
            onClick={() => setMegaMode(!mega)}
            style={{padding: '6px 12px', fontFamily: MONO, fontSize: '12px', fontWeight: 600, border: '1px solid #E6E6E8', borderRadius: '6px', background: mega ? '#0F172A' : '#fff', color: mega ? '#fff' : '#0F172A', cursor: 'pointer'}}
          >
            setMegaMode({String(!mega)})
          </button>
          <Body as="span" size="small" color="subtle">
            Toggle these — every readout above updates live via the theme-change event.
          </Body>
        </div>

      </CardBody>
    </Card>
  );
}

/* ── 2. iconManager ──────────────────────────────────────────── */

function IconManagerDemo() {
  const activeTheme = useLiveTheme();
  const fontKey = getThemePrimaryIconFont(activeTheme);
  const cssPrefix = getThemeIconCssPrefix(activeTheme);
  const fontInfo = getIconFontInfo(fontKey as Parameters<typeof getIconFontInfo>[0]);
  const allFonts = listIconFonts();
  const allIcons = React.useMemo(() => getIconsForTheme(activeTheme), [activeTheme]);
  const commonCount = React.useMemo(() => getCommonIcons().length, []);
  const [query, setQuery] = React.useState('');
  const matches = React.useMemo(
    () => searchIcons(fontKey as Parameters<typeof searchIcons>[0], query),
    [fontKey, query],
  );
  const PROBE = 'Cart';
  const cartExists = hasIcon(fontKey as Parameters<typeof hasIcon>[0], PROBE);
  const shown = matches.slice(0, 36);

  return (
    <Card id="icon-manager">
      <CardHeader title="Icon Manager" />
      <CardBody>
        <StatRow>
          <Stat label="listIconFonts()" value={`${allFonts.length} fonts`} />
          <Stat label="getThemePrimaryIconFont()" value={`"${fontKey}"`} />
          <Stat label="cssPrefix" value={`.${cssPrefix}`} />
          <Stat label="getIconsForTheme()" value={`${allIcons.length} icons`} />
          <Stat label="getCommonIcons()" value={`${commonCount} ubiquitous`} />
          <Stat label={`hasIcon("${PROBE}")`} value={cartExists ? 'true ✓' : 'false ✗'} accent={cartExists ? '#15803D' : '#B91C1C'} />
        </StatRow>

        <div style={{display: 'grid', gap: '10px'}}>
          <SearchInput value={query} onChange={setQuery} placeholder={`searchIcons("${fontKey}", …)`} />
          <Body as="p" size="small" color="subtle" style={{margin: 0, fontFamily: MONO}}>
            → {matches.length} match{matches.length === 1 ? '' : 'es'} in <code>{fontInfo.fontFamily}</code>{shown.length < matches.length ? ` (showing first ${shown.length})` : ''}
          </Body>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '8px', maxHeight: '280px', overflowY: 'auto', border: '1px solid #E6E6E8', borderRadius: '8px', padding: '12px', background: '#FAFAFB'}}>
          {shown.length === 0 ? (
            <Body as="p" size="small" color="subtle" style={{gridColumn: '1 / -1', textAlign: 'center', margin: '20px 0', fontFamily: MONO}}>
              [] — no matches
            </Body>
          ) : shown.map((name) => (
            <div key={name} title={name} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '8px 4px', borderRadius: '6px', background: '#fff', border: '1px solid #EEEEF0'}}>
              <Icon name={name} style={{fontSize: '22px'}} a11yLabel={name} />
              <span style={{fontSize: '10px', color: '#74767C', fontFamily: MONO, maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{name}</span>
            </div>
          ))}
        </div>

      </CardBody>
    </Card>
  );
}

/* ── 3. illustrationManager ──────────────────────────────────── */

function IllustrationManagerDemo() {
  const types = listIllustrationTypes();
  const [activeType, setActiveType] = React.useState(types[0]);
  const [query, setQuery] = React.useState('');
  const info = getIllustrationTypeInfo(activeType);
  const allNames = React.useMemo(() => listIllustrations(activeType), [activeType]);
  const matches = React.useMemo(() => searchIllustrations(activeType, query), [activeType, query]);
  const samples = matches.slice(0, 6);
  const renderSize = activeType === 'spot' ? 180 : activeType === 'mono-large' ? 140 : 88;

  return (
    <Card id="illustration-manager">
      <CardHeader title="Illustration Manager" />
      <CardBody>
        <StatRow>
          {types.map((t) => {
            const i = getIllustrationTypeInfo(t);
            return <Stat key={t} label={`type: ${t}`} value={`${i.count} ${i.label.toLowerCase()}`} />;
          })}
          <Stat label="getIllustrationTypeInfo()" value={`${info.count} in "${info.label}"`} />
        </StatRow>

        <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
          {types.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => { setActiveType(t); setQuery(''); }}
              style={{padding: '6px 12px', fontFamily: MONO, fontSize: '12px', fontWeight: 600, border: '1px solid #E6E6E8', borderRadius: '999px', background: t === activeType ? '#0F172A' : '#fff', color: t === activeType ? '#fff' : '#0F172A', cursor: 'pointer'}}
            >
              {t}
            </button>
          ))}
        </div>

        <div style={{display: 'grid', gap: '10px'}}>
          <SearchInput value={query} onChange={setQuery} placeholder={`searchIllustrations("${activeType}", …)`} />
          <Body as="p" size="small" color="subtle" style={{margin: 0, fontFamily: MONO}}>
            → {matches.length} / {allNames.length} match{matches.length === 1 ? '' : 'es'} — rendering first {samples.length}
          </Body>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${renderSize + 32}px, 1fr))`, gap: '12px'}}>
          {samples.length === 0 ? (
            <Body as="p" size="small" color="subtle" style={{gridColumn: '1 / -1', textAlign: 'center', margin: '20px 0', fontFamily: MONO}}>
              [] — no matches
            </Body>
          ) : samples.map((name) => (
            <div key={String(name)} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '12px', background: '#FAFAFB', border: '1px solid #EEEEF0', borderRadius: '8px'}}>
              <Illustration type={activeType} name={name as never} size={renderSize} title={String(name)} />
              <span style={{fontSize: '11px', color: 'var(--ld-semantic-color-text-subtle, #515357)', fontFamily: MONO, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%'}}>{String(name)}</span>
            </div>
          ))}
        </div>

      </CardBody>
    </Card>
  );
}

/* ── 4. mediaManager ─────────────────────────────────────────── */

const LOGO_PROBES = ['Logo', 'LogoInverse', 'Wordmark', 'WordmarkInverse', 'PrivacyChoice'];

function MediaAssetTile({tenant, name}: {tenant: MediaTenant; name: string}) {
  const asset = getMedia(tenant, name);
  const isInverse = /inverse/i.test(name);
  const bg = isInverse ? '#0F172A' : '#FFFFFF';
  const border = isInverse ? '1px solid #0F172A' : '1px solid #EEEEF0';
  if (!asset) {
    return (
      <div style={{padding: '12px', background: '#FAFAFB', border, borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', minHeight: '110px', justifyContent: 'center'}}>
        <span style={{fontFamily: MONO, fontSize: '11px', color: '#B91C1C'}}>null</span>
        <span style={{fontFamily: MONO, fontSize: '10px', color: '#74767C'}}>{name}</span>
      </div>
    );
  }
  // The Airtable pipeline strips width/height from the SVG root so consumers
  // can size via CSS. The .ld-util-media-svg class (defined once at page
  // scope) sizes the inner <svg> to fill the preview slot.
  return (
    <div style={{padding: '12px', background: bg, border, borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', minHeight: '110px', justifyContent: 'space-between'}}>
      <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0, width: '100%', height: 64}}>
        {asset.kind === 'svg' ? (
          <span
            aria-hidden="true"
            className="ld-util-media-svg"
            style={{display: 'block', width: '100%', height: '100%'}}
            dangerouslySetInnerHTML={{__html: asset.svg ?? ''}}
          />
        ) : (
          <img src={asset.src} alt="" style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}} />
        )}
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: '6px', width: '100%', justifyContent: 'center'}}>
        <span style={{padding: '1px 6px', borderRadius: '999px', background: asset.kind === 'svg' ? '#DBEAFE' : '#FEF3C7', color: asset.kind === 'svg' ? '#1E3A8A' : '#92400E', fontFamily: MONO, fontSize: '9px', fontWeight: 700, letterSpacing: '0.4px'}}>
          {asset.kind.toUpperCase()}
        </span>
        <span style={{fontFamily: MONO, fontSize: '10.5px', color: isInverse ? '#CBD5E1' : '#2E2F32', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{name}</span>
      </div>
    </div>
  );
}

function MediaManagerDemo() {
  const activeTheme = useLiveTheme();
  const hookTenant = useThemeMediaTenant();
  const resolvedTenant = getMediaTenantForTheme(activeTheme);
  const tenants = listTenants();
  const tenantInfo = getTenantInfo(resolvedTenant);
  const [activeTenant, setActiveTenant] = React.useState<MediaTenant>(resolvedTenant);
  React.useEffect(() => { setActiveTenant(resolvedTenant); }, [resolvedTenant]);

  const all = React.useMemo(() => listMedia(activeTenant), [activeTenant]);
  const svgCount = all.filter((a) => a.kind === 'svg').length;
  const pngCount = all.length - svgCount;
  const logos = LOGO_PROBES.filter((n) => hasMedia(activeTenant, n));

  // Show six card-art PNGs that exist on this tenant (CreditCardBrand* / CreditCardGeneric*)
  const cardArt = all.filter((a) => a.kind === 'png' && /^Credit/.test(a.name)).slice(0, 6);

  return (
    <Card id="media-manager">
      <CardHeader title="Media Manager" />
      <CardBody>
        <StatRow>
          <Stat label="listTenants()" value={`${tenants.length} tenants`} />
          <Stat label="getMediaTenantForTheme()" value={`"${resolvedTenant}"`} />
          <Stat label="useThemeMediaTenant()" value={`"${hookTenant}"`} />
          <Stat label="THEME_MEDIA_TENANT" value={`${Object.keys(THEME_MEDIA_TENANT).length} themes mapped`} />
          <Stat label={`listMedia("${activeTenant}")`} value={`${all.length} (${svgCount} svg / ${pngCount} png)`} />
          <Stat label="getTenantInfo()" value={tenantInfo.label} />
        </StatRow>

        <div style={{display: 'flex', gap: '6px', flexWrap: 'wrap'}}>
          {tenants.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActiveTenant(t)}
              style={{padding: '5px 10px', fontFamily: MONO, fontSize: '11px', fontWeight: 600, border: t === activeTenant ? '1px solid #0F172A' : '1px solid #E6E6E8', borderRadius: '999px', background: t === activeTenant ? '#0F172A' : (t === resolvedTenant ? '#FEF3C7' : '#fff'), color: t === activeTenant ? '#fff' : '#0F172A', cursor: 'pointer'}}
              title={t === resolvedTenant ? 'Current theme resolves here' : undefined}
            >
              {t}{t === resolvedTenant ? ' ◉' : ''}
            </button>
          ))}
        </div>

        <div>
          <Caption as="p" weight="alt" style={{margin: '0 0 8px', color: '#74767C', textTransform: 'uppercase', letterSpacing: '0.4px', fontSize: '10px'}}>
            getMedia(tenant, name) → logos & wordmarks
          </Caption>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px'}}>
            {logos.map((name) => <MediaAssetTile key={name} tenant={activeTenant} name={name} />)}
          </div>
        </div>

        {cardArt.length > 0 && (
          <div>
            <Caption as="p" weight="alt" style={{margin: '0 0 8px', color: '#74767C', textTransform: 'uppercase', letterSpacing: '0.4px', fontSize: '10px'}}>
              same call, kind === "png" → card art renders as &lt;img&gt;
            </Caption>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px'}}>
              {cardArt.map((a) => <MediaAssetTile key={a.name} tenant={activeTenant} name={a.name} />)}
            </div>
          </div>
        )}

      </CardBody>
    </Card>
  );
}

/* ── Page ────────────────────────────────────────────────────── */

export default function UtilitiesPage() {
  return (
    <PageWrapper
      title="Utilities"
      category="SYSTEM"
      description="Live readouts powered by the manager modules in src/utils. Every number, swatch, icon, illustration, and brand mark on this page is produced by the same functions an agent or app would call."
    >
      {/* The Airtable pipeline strips width/height from media SVG roots so
          downstream CSS controls sizing. Force injected <svg> elements inside
          our preview tiles to fill the tile box. */}
      <style>{`.ld-util-media-svg svg { width: 100%; height: 100%; display: block; }`}</style>

      <div style={{display: 'grid', gap: '20px'}}>
        <ThemeManagerDemo />
        <IconManagerDemo />
        <IllustrationManagerDemo />
        <MediaManagerDemo />
      </div>
    </PageWrapper>
  );
}
