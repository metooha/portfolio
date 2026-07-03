import * as React from 'react';
import {PageWrapper, ExampleSection, IconGrid} from './shared';
import {loadIconFont} from '../utils/Theming';
import manifest from '../fonts/icon-manifest.json';
import {TabNavigation, TabNavigationItem} from '../components/TabNavigation/TabNavigation';
import {SearchBar} from '../components/SearchBar/SearchBar';
import {Body} from '../components/Text/Text';

type BrandKey = keyof typeof manifest;

type BrandEntry = (typeof manifest)[BrandKey];

const BRAND_TABS: BrandKey[] = [
  'ld',
  'wcp',
  'sams-club',
  'ax',
  'ax-sams-club',
  'px',
  'px-sams-club',
  'bodega',
];

const ROUTE_TO_BRAND: Record<string, BrandKey> = {
  'icons-ld': 'ld',
  'icons-wcp': 'wcp',
  'icons-sams-club': 'sams-club',
  'icons-ax': 'ax',
  'icons-ax-sams-club': 'ax-sams-club',
  'icons-px': 'px',
  'icons-px-sams-club': 'px-sams-club',
  'icons-bodega': 'bodega',
};

function getInitialBrand(): BrandKey {
  if (typeof window === 'undefined') return 'ld';
  const hash = window.location.hash.replace('#', '');
  return ROUTE_TO_BRAND[hash] ?? 'ld';
}

export default function IconsPage() {
  const [activeBrand, setActiveBrand] = React.useState<BrandKey>(getInitialBrand);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    loadIconFont(activeBrand);
  }, [activeBrand]);

  React.useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const next = ROUTE_TO_BRAND[hash];
      if (next && next !== activeBrand) {
        setActiveBrand(next);
        setSearch('');
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [activeBrand]);

  const brand = manifest[activeBrand] as BrandEntry;
  const normalizedSearch = search.trim().toLowerCase();
  const filtered = normalizedSearch
    ? brand.icons.filter((name: string) => name.toLowerCase().includes(normalizedSearch))
    : brand.icons;

  const handleTabClick = (key: BrandKey) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (key === activeBrand) return;
    setActiveBrand(key);
    setSearch('');
    if (typeof window !== 'undefined') {
      const nextHash = `icons-${key}`;
      if (window.location.hash.replace('#', '') !== nextHash) {
        window.history.replaceState(null, '', `#${nextHash}`);
      }
    }
  };

  return (
    <PageWrapper
      title="Icons"
      category="Media"
      description={`Catalog of icons across ${BRAND_TABS.length} Living Design brand fonts. Switch tabs to browse each font.`}
    >
      <div style={{marginBottom: '24px'}}>
        <TabNavigation aria-label="Icon brand tabs">
          {BRAND_TABS.map((key) => (
            <TabNavigationItem
              key={key}
              href={`#icons-${key}`}
              isCurrent={activeBrand === key}
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
            placeholder={`Search ${brand.count} ${brand.label} icons...`}
            value={search}
            onChange={setSearch}
            onClear={() => setSearch('')}
            UNSAFE_style={{width: '100%', maxWidth: '400px'}}
          />
          <Body as="span" size="small" color="subtle">
            {normalizedSearch
              ? `${filtered.length} of ${brand.count} icons`
              : `${brand.count} icons`}
          </Body>
        </div>
        <IconGrid icons={filtered} cssClass={brand.cssClass} />
      </ExampleSection>
    </PageWrapper>
  );
}
