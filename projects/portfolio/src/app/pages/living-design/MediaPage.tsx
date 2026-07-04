import * as React from 'react';
import {ExampleSection, GuidelinesSection, MediaGrid, MediaGridItem, MediaGridBackground, PageWrapper} from './shared';
import manifest from '@/living-design/media/manifest.json';
import {TabNavigation, TabNavigationItem} from '@/living-design/components/TabNavigation/TabNavigation';
import {SearchBar} from '@/living-design/components/SearchBar/SearchBar';
import {Button, ButtonGroup} from '@/living-design/components/Button/Button';
import {Body} from '@/living-design/components/Text/Text';

const BACKGROUND_OPTIONS: Array<{value: MediaGridBackground; label: string}> = [
  {value: 'split', label: 'Split'},
  {value: 'light', label: 'Light'},
  {value: 'dark', label: 'Dark'},
];

type ThemeKey = keyof typeof manifest;

type ManifestAsset = {
  name: string;
  token: string;
  kind?: string;
  width?: number;
  height?: number;
};

// Tab order mirrors the inheritance tree top-down: base first, then siblings
// grouped by branch. Keep in sync with MEDIA_THEMES in airtable-sync/config.mjs.
const THEME_TABS: ThemeKey[] = (
  [
    'wcp',
    'walmart-business',
    'walmart-legacy',
    'walmart-mx',
    'walmart-ca',
    'walmart-plus',
    'sams-club',
    'sams-club-maverick',
    'members-mark',
    'bodega',
  ] as ThemeKey[]
).filter((k) => k in manifest);

const ROUTE_TO_THEME: Record<string, ThemeKey> = Object.fromEntries(
  THEME_TABS.map((key) => [`media-${key}`, key]),
);

function getInitialTheme(): ThemeKey {
  const fallback = THEME_TABS[0] ?? ('wcp' as ThemeKey);
  if (typeof window === 'undefined') return fallback;
  const hash = window.location.hash.replace('#', '');
  return ROUTE_TO_THEME[hash] ?? fallback;
}

const MIN_CELL_PX = 180;

export default function MediaPage() {
  const [activeTheme, setActiveTheme] = React.useState<ThemeKey>(getInitialTheme);
  const [search, setSearch] = React.useState('');
  const [background, setBackground] = React.useState<MediaGridBackground>('split');

  React.useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const next = ROUTE_TO_THEME[hash];
      if (next && next !== activeTheme) {
        setActiveTheme(next);
        setSearch('');
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [activeTheme]);

  const entry = manifest[activeTheme];
  const allAssets: ManifestAsset[] = entry?.assets ?? [];
  const normalizedSearch = search.trim().toLowerCase();
  const filtered = normalizedSearch
    ? allAssets.filter((a) => {
        const haystack = [a.name, a.token].filter(Boolean).join(' ').toLowerCase();
        return haystack.includes(normalizedSearch);
      })
    : allAssets;

  const items: MediaGridItem[] = filtered.map((a) => ({
    name: a.name,
    kind: a.kind === 'png' ? 'png' : 'svg',
    width: a.width ?? 0,
    height: a.height ?? 0,
  }));

  const handleTabClick = (key: ThemeKey) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (key === activeTheme) return;
    setActiveTheme(key);
    setSearch('');
    if (typeof window !== 'undefined') {
      const nextHash = `media-${key}`;
      if (window.location.hash.replace('#', '') !== nextHash) {
        window.history.replaceState(null, '', `#${nextHash}`);
      }
    }
  };

  return (
    <PageWrapper
      title="Brand Media"
      category="Media"
      description={`Tenant-specific brand assets (logos, wordmarks, card art, error states) synced from the Living Design Airtable. Each tab extends WCP and overrides the tokens that differ. ${THEME_TABS.length} themes.`}
    >
      <div style={{marginBottom: '24px'}}>
        <TabNavigation aria-label="Media theme tabs">
          {THEME_TABS.map((key) => (
            <TabNavigationItem
              key={key}
              href={`#media-${key}`}
              isCurrent={activeTheme === key}
              onClick={handleTabClick(key)}
            >
              {manifest[key].label}
            </TabNavigationItem>
          ))}
        </TabNavigation>
      </div>

      <ExampleSection>
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
            placeholder={`Search ${entry?.count ?? 0} ${entry?.label ?? ''} assets...`}
            value={search}
            onChange={setSearch}
            onClear={() => setSearch('')}
            UNSAFE_style={{width: '100%', maxWidth: '400px'}}
          />
          <Body as="span" size="small" color="subtle">
            {normalizedSearch
              ? `${items.length} of ${entry?.count ?? 0} assets`
              : `${entry?.count ?? 0} assets`}
          </Body>
          <ButtonGroup aria-label="Tile background">
            {BACKGROUND_OPTIONS.map((opt) => (
              <Button
                key={opt.value}
                size="small"
                variant={background === opt.value ? 'primary' : 'secondary'}
                aria-pressed={background === opt.value}
                onClick={() => setBackground(opt.value)}
              >
                {opt.label}
              </Button>
            ))}
          </ButtonGroup>
        </div>
        <MediaGrid
          themeKey={activeTheme}
          items={items}
          minCellPx={MIN_CELL_PX}
          background={background}
        />
      </ExampleSection>

      <GuidelinesSection
        description="Use Brand Media as the source of truth for tenant logos, wordmarks, card art, and error illustrations. Each tab inherits from WCP and overrides only the assets that differ for that brand. Pick the background mode that matches your surface so dark and light variants render correctly."
        defaultValue="background='split'"
      />
    </PageWrapper>
  );
}
