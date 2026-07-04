import * as React from 'react';
import {PageWrapper, ExampleSection, IllustrationGrid} from './shared';
import manifest from '@/app/assets/walmart-assets/illustrations/manifest.json';
import {TabNavigation, TabNavigationItem} from '@/app/components/TabNavigation/TabNavigation';
import {SearchBar} from '@/app/components/SearchBar/SearchBar';
import {Body} from '@/app/components/Text/Text';

type TypeKey = keyof typeof manifest;

type ManifestEntry = (typeof manifest)[TypeKey];

const TYPE_TABS: TypeKey[] = ['mono-small', 'mono-large', 'spot'];

const ROUTE_TO_TYPE: Record<string, TypeKey> = {
  'illustrations-mono-small': 'mono-small',
  'illustrations-mono-large': 'mono-large',
  'illustrations-spot': 'spot',
};

function getInitialType(): TypeKey {
  if (typeof window === 'undefined') return 'mono-small';
  const hash = window.location.hash.replace('#', '');
  return ROUTE_TO_TYPE[hash] ?? 'mono-small';
}

// Render larger illustration types (Mono Large / Spot) at larger cell sizes so
// they don't get squished. Mono Small renders at 72×72 native.
const MIN_CELL_PX: Record<TypeKey, number> = {
  'mono-small': 140,
  'mono-large': 220,
  'spot': 240,
};

export default function IllustrationsPage() {
  const [activeType, setActiveType] = React.useState<TypeKey>(getInitialType);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const next = ROUTE_TO_TYPE[hash];
      if (next && next !== activeType) {
        setActiveType(next);
        setSearch('');
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [activeType]);

  const entry = manifest[activeType] as ManifestEntry;
  const normalizedSearch = search.trim().toLowerCase();
  const filtered = normalizedSearch
    ? entry.items.filter((item) => item.name.toLowerCase().includes(normalizedSearch))
    : entry.items;

  const handleTabClick = (key: TypeKey) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (key === activeType) return;
    setActiveType(key);
    setSearch('');
    if (typeof window !== 'undefined') {
      const nextHash = `illustrations-${key}`;
      if (window.location.hash.replace('#', '') !== nextHash) {
        window.history.replaceState(null, '', `#${nextHash}`);
      }
    }
  };

  return (
    <PageWrapper
      title="Illustrations"
      category="Media"
      description={`SVG illustrations across ${TYPE_TABS.length} types from the Component Library Airtable. Switch tabs to browse each illustration size.`}
    >
      <div style={{marginBottom: '24px'}}>
        <TabNavigation aria-label="Illustration type tabs">
          {TYPE_TABS.map((key) => (
            <TabNavigationItem
              key={key}
              href={`#illustrations-${key}`}
              isCurrent={activeType === key}
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
            placeholder={`Search ${entry.count} ${entry.label} illustrations...`}
            value={search}
            onChange={setSearch}
            onClear={() => setSearch('')}
            UNSAFE_style={{width: '100%', maxWidth: '400px'}}
          />
          <Body as="span" size="small" color="subtle">
            {normalizedSearch
              ? `${filtered.length} of ${entry.count} illustrations`
              : `${entry.count} illustrations`}
          </Body>
        </div>
        <IllustrationGrid
          type={activeType}
          items={filtered}
          minCellPx={MIN_CELL_PX[activeType]}
        />
      </ExampleSection>
    </PageWrapper>
  );
}
