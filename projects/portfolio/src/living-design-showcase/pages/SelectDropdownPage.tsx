import * as React from 'react';
import {
  SelectDropdown,
  SelectDropdownTrigger,
  SelectDropdownContent,
  SelectDropdownItem,
  SelectDropdownLabel,
  SelectDropdownSeparator,
  SelectDropdownCheckboxItem,
  SelectDropdownRadioGroup,
  SelectDropdownRadioItem,
  SelectDropdownCheckmarkItem,
  SelectDropdownDescriptionItem,
  SelectDropdownDescriptionFavoriteItem,
  SelectDropdownSwitchItem,
  SelectDropdownEditItem,
  SelectDropdownSectionTitle,
  SelectDropdownAccordionSection,
  SelectDropdownFooter,
} from '@/living-design/components/SelectDropdown/SelectDropdown';
import {Button, ButtonGroup} from '@/living-design/components/Button/Button';
import {Body} from '@/living-design/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

type SelectPattern =
  | 'checkmark'
  | 'radio'
  | 'description'
  | 'description-favorite'
  | 'multi'
  | 'switch'
  | 'edit';

const PATTERNS: Array<{value: SelectPattern; label: string; description: string}> = [
  {value: 'checkmark', label: 'Checkmark', description: 'Single choice; the active option shows a trailing check.'},
  {value: 'radio', label: 'Radio', description: 'Single choice using a leading radio control.'},
  {value: 'description', label: 'Description', description: 'Rich options with an avatar and supporting text.'},
  {value: 'description-favorite', label: 'Description Favorite', description: 'Description option with a trailing favorite star alongside the selection check.'},
  {value: 'multi', label: 'Multi-select', description: 'Pick several options with checkbox items, then Cancel or Apply as filters.'},
  {value: 'switch', label: 'Switch', description: 'Toggle a setting on or off with a trailing switch; the menu stays open.'},
  {value: 'edit', label: 'Edit', description: 'Read-only until you double-click into it; clicking away saves the value.'},
];

export default function SelectDropdownPage() {
  const [pattern, setPattern] = React.useState<SelectPattern>('checkmark');
  const activePattern = PATTERNS.find((item) => item.value === pattern) ?? PATTERNS[0];

  // Selection state for the demos
  const [sortBy, setSortBy] = React.useState('relevance');
  const [position, setPosition] = React.useState('bottom');
  const [account, setAccount] = React.useState('personal');
  // Multi-select filters use a draft/applied pattern: toggles update the draft
  // and only commit to `appliedFilters` when the user presses Apply.
  const initialFilters = {organic: true, onSale: false, inStock: false};
  const [filters, setFilters] = React.useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = React.useState(initialFilters);
  const [multiConfigOpen, setMultiConfigOpen] = React.useState(false);
  const [multiCardOpen, setMultiCardOpen] = React.useState(false);
  const setFilter = (key: keyof typeof filters, value: boolean) =>
    setFilters((prev) => ({...prev, [key]: value}));
  const applyFilters = () => setAppliedFilters(filters);
  const cancelFilters = () => setFilters(appliedFilters);
  const appliedSummary =
    [appliedFilters.organic && 'Organic', appliedFilters.onSale && 'On sale', appliedFilters.inStock && 'In stock']
      .filter(Boolean)
      .join(', ') || 'None';
  const [lists, setLists] = React.useState([
    'Weekly groceries',
    'Party supplies',
    'Pantry staples',
    'Cleaning',
    'Office snacks',
  ]);
  const [selectedList, setSelectedList] = React.useState(0);
  const updateList = (index: number, value: string) =>
    setLists((prev) => prev.map((name, i) => (i === index ? value : name)));

  // Description Favorite demo state
  const [favAccount, setFavAccount] = React.useState('personal');
  const [favorites, setFavorites] = React.useState<string[]>(['work']);
  const toggleFavorite = (key: string) =>
    setFavorites((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  // Switch demo state
  const [switches, setSwitches] = React.useState({wifi: true, bluetooth: false, airplane: false});
  const setSwitch = (key: keyof typeof switches, value: boolean) =>
    setSwitches((prev) => ({...prev, [key]: value}));

  // Accordion filter state
  const [brandGV, setBrandGV] = React.useState(true);
  const [brandMS, setBrandMS] = React.useState(false);

  return (
    <PageWrapper
      title="Select Dropdown"
      category="Shared Components"
      description="A select dropdown presents a list of options the user picks from rather than navigates. It supports single-choice (checkmark, radio), multi-select, rich options with descriptions, inline-edit, plus section titles and collapsible accordion groups. For navigation and commands, use Menu instead."
    >
      <ExampleSection
        title="Component Configuration"
        description="Switch between the selection item types and open the trigger in the preview."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h4" size="medium" weight="alt" style={{margin: 0}}>
                  Item type
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Each type reflects its selected state immediately so the active choice stays scannable.
                </Body>
              </div>
              <ButtonGroup aria-label="Select item type">
                {PATTERNS.map((item) => (
                  <Button
                    key={item.value}
                    size="small"
                    variant={pattern === item.value ? 'primary' : 'secondary'}
                    aria-pressed={pattern === item.value}
                    onClick={() => setPattern(item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>
            </>
          }
          preview={
            <DocsCard title={activePattern.label} description={activePattern.description}>
              {pattern === 'checkmark' ? (
                <div style={{display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap'}}>
                  <SelectDropdown>
                    <SelectDropdownTrigger asChild>
                      <Button variant="secondary" size="small">Sort by</Button>
                    </SelectDropdownTrigger>
                    <SelectDropdownContent>
                      <SelectDropdownCheckmarkItem checked={sortBy === 'relevance'} onSelect={() => setSortBy('relevance')}>Best match</SelectDropdownCheckmarkItem>
                      <SelectDropdownCheckmarkItem checked={sortBy === 'price-low'} onSelect={() => setSortBy('price-low')}>Price: low to high</SelectDropdownCheckmarkItem>
                      <SelectDropdownCheckmarkItem checked={sortBy === 'price-high'} onSelect={() => setSortBy('price-high')}>Price: high to low</SelectDropdownCheckmarkItem>
                      <SelectDropdownCheckmarkItem disabled>Rating (unavailable)</SelectDropdownCheckmarkItem>
                    </SelectDropdownContent>
                  </SelectDropdown>
                  <Body as="p" size="small" color="subtle" style={{margin: 0}}>Selected: {sortBy}</Body>
                </div>
              ) : null}
              {pattern === 'radio' ? (
                <div style={{display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap'}}>
                  <SelectDropdown>
                    <SelectDropdownTrigger asChild>
                      <Button variant="secondary" size="small">Panel position</Button>
                    </SelectDropdownTrigger>
                    <SelectDropdownContent>
                      <SelectDropdownRadioGroup value={position} onValueChange={setPosition}>
                        <SelectDropdownRadioItem value="top">Top</SelectDropdownRadioItem>
                        <SelectDropdownRadioItem value="bottom">Bottom</SelectDropdownRadioItem>
                        <SelectDropdownRadioItem value="left">Left</SelectDropdownRadioItem>
                        <SelectDropdownRadioItem value="right" disabled>Right (unavailable)</SelectDropdownRadioItem>
                      </SelectDropdownRadioGroup>
                    </SelectDropdownContent>
                  </SelectDropdown>
                  <Body as="p" size="small" color="subtle" style={{margin: 0}}>Selected: {position}</Body>
                </div>
              ) : null}
              {pattern === 'description' ? (
                <div style={{display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap'}}>
                  <SelectDropdown>
                    <SelectDropdownTrigger asChild>
                      <Button variant="secondary" size="small">Choose account</Button>
                    </SelectDropdownTrigger>
                    <SelectDropdownContent>
                      <SelectDropdownDescriptionItem title="Personal" description="amy@example.com" checked={account === 'personal'} onSelect={() => setAccount('personal')} />
                      <SelectDropdownDescriptionItem title="Work" description="amy.ha@walmart.com" checked={account === 'work'} onSelect={() => setAccount('work')} />
                      <SelectDropdownDescriptionItem title="Shared" description="team@example.com" checked={account === 'shared'} onSelect={() => setAccount('shared')} />
                    </SelectDropdownContent>
                  </SelectDropdown>
                  <Body as="p" size="small" color="subtle" style={{margin: 0}}>Selected: {account}</Body>
                </div>
              ) : null}
              {pattern === 'description-favorite' ? (
                <div style={{display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap'}}>
                  <SelectDropdown>
                    <SelectDropdownTrigger asChild>
                      <Button variant="secondary" size="small">Choose account</Button>
                    </SelectDropdownTrigger>
                    <SelectDropdownContent>
                      <SelectDropdownDescriptionFavoriteItem title="Personal" description="amy@example.com" checked={favAccount === 'personal'} onSelect={() => setFavAccount('personal')} favorite={favorites.includes('personal')} onFavoriteChange={() => toggleFavorite('personal')} />
                      <SelectDropdownDescriptionFavoriteItem title="Work" description="amy.ha@walmart.com" checked={favAccount === 'work'} onSelect={() => setFavAccount('work')} favorite={favorites.includes('work')} onFavoriteChange={() => toggleFavorite('work')} />
                      <SelectDropdownDescriptionFavoriteItem title="Shared" description="team@example.com" checked={favAccount === 'shared'} onSelect={() => setFavAccount('shared')} favorite={favorites.includes('shared')} onFavoriteChange={() => toggleFavorite('shared')} />
                    </SelectDropdownContent>
                  </SelectDropdown>
                  <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                    Selected: {favAccount}; Favorites: {favorites.join(', ') || 'None'}
                  </Body>
                </div>
              ) : null}
              {pattern === 'multi' ? (
                <div style={{display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap'}}>
                  <SelectDropdown
                    open={multiConfigOpen}
                    onOpenChange={(open) => {
                      setMultiConfigOpen(open);
                      if (!open) cancelFilters();
                    }}
                  >
                    <SelectDropdownTrigger asChild>
                      <Button variant="secondary" size="small">Filters</Button>
                    </SelectDropdownTrigger>
                    <SelectDropdownContent>
                      <SelectDropdownLabel>Refine</SelectDropdownLabel>
                      <SelectDropdownSeparator />
                      <SelectDropdownCheckboxItem checked={filters.organic} onCheckedChange={(v) => setFilter('organic', v)}>Organic</SelectDropdownCheckboxItem>
                      <SelectDropdownCheckboxItem checked={filters.onSale} onCheckedChange={(v) => setFilter('onSale', v)}>On sale</SelectDropdownCheckboxItem>
                      <SelectDropdownCheckboxItem checked={filters.inStock} onCheckedChange={(v) => setFilter('inStock', v)}>In stock</SelectDropdownCheckboxItem>
                      <SelectDropdownFooter>
                        <Button variant="tertiary" size="small" onClick={() => { cancelFilters(); setMultiConfigOpen(false); }}>Cancel</Button>
                        <Button variant="secondary" size="small" onClick={() => { applyFilters(); setMultiConfigOpen(false); }}>Apply</Button>
                      </SelectDropdownFooter>
                    </SelectDropdownContent>
                  </SelectDropdown>
                  <Body as="p" size="small" color="subtle" style={{margin: 0}}>Applied: {appliedSummary}</Body>
                </div>
              ) : null}
              {pattern === 'switch' ? (
                <div style={{display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap'}}>
                  <SelectDropdown>
                    <SelectDropdownTrigger asChild>
                      <Button variant="secondary" size="small">Connections</Button>
                    </SelectDropdownTrigger>
                    <SelectDropdownContent>
                      <SelectDropdownSwitchItem checked={switches.wifi} onCheckedChange={(v) => setSwitch('wifi', v)}>Wi-Fi</SelectDropdownSwitchItem>
                      <SelectDropdownSwitchItem checked={switches.bluetooth} onCheckedChange={(v) => setSwitch('bluetooth', v)}>Bluetooth</SelectDropdownSwitchItem>
                      <SelectDropdownSwitchItem checked={switches.airplane} onCheckedChange={(v) => setSwitch('airplane', v)}>Airplane mode</SelectDropdownSwitchItem>
                      <SelectDropdownSwitchItem disabled checked={false}>Hotspot (unavailable)</SelectDropdownSwitchItem>
                    </SelectDropdownContent>
                  </SelectDropdown>
                  <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                    {[switches.wifi && 'Wi-Fi', switches.bluetooth && 'Bluetooth', switches.airplane && 'Airplane'].filter(Boolean).join(', ') || 'All off'}
                  </Body>
                </div>
              ) : null}
              {pattern === 'edit' ? (
                <SelectDropdown>
                  <SelectDropdownTrigger asChild>
                    <Button variant="secondary" size="small">Rename list</Button>
                  </SelectDropdownTrigger>
                  <SelectDropdownContent>
                    <SelectDropdownLabel>Rename a list</SelectDropdownLabel>
                    {lists.map((name, i) => (
                      <SelectDropdownEditItem
                        key={i}
                        value={name}
                        onValueChange={(value) => updateList(i, value)}
                        onSelect={() => setSelectedList(i)}
                        error={name.trim() === '' ? 'List name is required.' : undefined}
                        placeholder="Enter a name"
                        editOnDoubleClick
                        checked={selectedList === i}
                      />
                    ))}
                  </SelectDropdownContent>
                </SelectDropdown>
              ) : null}
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Select item types"
        description="Selection-oriented options the user picks a value from. Each reflects its selected state immediately."
      >
        <DocsGrid>
          <DocsCard title="Checkmark" description="Single-select option with a trailing checkmark on the active choice; the selected label is bold.">
            <div style={{display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap'}}>
              <SelectDropdown>
                <SelectDropdownTrigger asChild>
                  <Button variant="secondary" size="small">Sort by</Button>
                </SelectDropdownTrigger>
                <SelectDropdownContent>
                  <SelectDropdownCheckmarkItem checked={sortBy === 'relevance'} onSelect={() => setSortBy('relevance')}>Best match</SelectDropdownCheckmarkItem>
                  <SelectDropdownCheckmarkItem checked={sortBy === 'price-low'} onSelect={() => setSortBy('price-low')}>Price: low to high</SelectDropdownCheckmarkItem>
                  <SelectDropdownCheckmarkItem checked={sortBy === 'price-high'} onSelect={() => setSortBy('price-high')}>Price: high to low</SelectDropdownCheckmarkItem>
                  <SelectDropdownCheckmarkItem disabled>Rating (unavailable)</SelectDropdownCheckmarkItem>
                </SelectDropdownContent>
              </SelectDropdown>
              <Body as="p" size="small" color="subtle" style={{margin: 0}}>Selected: {sortBy}</Body>
            </div>
          </DocsCard>

          <DocsCard title="Radio" description="Mutually exclusive options using a leading radio control. Selecting one clears the rest.">
            <div style={{display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap'}}>
              <SelectDropdown>
                <SelectDropdownTrigger asChild>
                  <Button variant="secondary" size="small">Panel position</Button>
                </SelectDropdownTrigger>
                <SelectDropdownContent>
                  <SelectDropdownRadioGroup value={position} onValueChange={setPosition}>
                    <SelectDropdownRadioItem value="top">Top</SelectDropdownRadioItem>
                    <SelectDropdownRadioItem value="bottom">Bottom</SelectDropdownRadioItem>
                    <SelectDropdownRadioItem value="left">Left</SelectDropdownRadioItem>
                    <SelectDropdownRadioItem value="right" disabled>Right (unavailable)</SelectDropdownRadioItem>
                  </SelectDropdownRadioGroup>
                </SelectDropdownContent>
              </SelectDropdown>
              <Body as="p" size="small" color="subtle" style={{margin: 0}}>Selected: {position}</Body>
            </div>
          </DocsCard>

          <DocsCard title="Multi-select" description="Checkbox items let the user pick several options at once. The menu stays open between toggles; Cancel discards the changes and Apply commits them as filters.">
            <div style={{display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap'}}>
              <SelectDropdown
                open={multiCardOpen}
                onOpenChange={(open) => {
                  setMultiCardOpen(open);
                  if (!open) cancelFilters();
                }}
              >
                <SelectDropdownTrigger asChild>
                  <Button variant="secondary" size="small">Filters</Button>
                </SelectDropdownTrigger>
                <SelectDropdownContent>
                  <SelectDropdownLabel>Refine</SelectDropdownLabel>
                  <SelectDropdownSeparator />
                  <SelectDropdownCheckboxItem checked={filters.organic} onCheckedChange={(v) => setFilter('organic', v)}>Organic</SelectDropdownCheckboxItem>
                  <SelectDropdownCheckboxItem checked={filters.onSale} onCheckedChange={(v) => setFilter('onSale', v)}>On sale</SelectDropdownCheckboxItem>
                  <SelectDropdownCheckboxItem checked={filters.inStock} onCheckedChange={(v) => setFilter('inStock', v)}>In stock</SelectDropdownCheckboxItem>
                  <SelectDropdownFooter>
                    <Button variant="tertiary" size="small" onClick={() => { cancelFilters(); setMultiCardOpen(false); }}>Cancel</Button>
                    <Button variant="secondary" size="small" onClick={() => { applyFilters(); setMultiCardOpen(false); }}>Apply</Button>
                  </SelectDropdownFooter>
                </SelectDropdownContent>
              </SelectDropdown>
              <Body as="p" size="small" color="subtle" style={{margin: 0}}>Applied: {appliedSummary}</Body>
            </div>
          </DocsCard>

          <DocsCard title="Description" description="A leading avatar with a title and supporting description; a trailing checkmark marks the selection.">
            <div style={{display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap'}}>
              <SelectDropdown>
                <SelectDropdownTrigger asChild>
                  <Button variant="secondary" size="small">Choose account</Button>
                </SelectDropdownTrigger>
                <SelectDropdownContent>
                  <SelectDropdownDescriptionItem title="Personal" description="amy@example.com" checked={account === 'personal'} onSelect={() => setAccount('personal')} />
                  <SelectDropdownDescriptionItem title="Work" description="amy.ha@walmart.com" checked={account === 'work'} onSelect={() => setAccount('work')} />
                  <SelectDropdownDescriptionItem title="Shared" description="team@example.com" checked={account === 'shared'} onSelect={() => setAccount('shared')} />
                </SelectDropdownContent>
              </SelectDropdown>
              <Body as="p" size="small" color="subtle" style={{margin: 0}}>Selected: {account}</Body>
            </div>
          </DocsCard>

          <DocsCard title="Description Favorite" description="A description option with a trailing favorite star plus the selection checkmark. The star toggles favorite independently of selecting the row.">
            <div style={{display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap'}}>
              <SelectDropdown>
                <SelectDropdownTrigger asChild>
                  <Button variant="secondary" size="small">Choose account</Button>
                </SelectDropdownTrigger>
                <SelectDropdownContent>
                  <SelectDropdownDescriptionFavoriteItem title="Personal" description="amy@example.com" checked={favAccount === 'personal'} onSelect={() => setFavAccount('personal')} favorite={favorites.includes('personal')} onFavoriteChange={() => toggleFavorite('personal')} />
                  <SelectDropdownDescriptionFavoriteItem title="Work" description="amy.ha@walmart.com" checked={favAccount === 'work'} onSelect={() => setFavAccount('work')} favorite={favorites.includes('work')} onFavoriteChange={() => toggleFavorite('work')} />
                  <SelectDropdownDescriptionFavoriteItem title="Shared" description="team@example.com" checked={favAccount === 'shared'} onSelect={() => setFavAccount('shared')} favorite={favorites.includes('shared')} onFavoriteChange={() => toggleFavorite('shared')} />
                </SelectDropdownContent>
              </SelectDropdown>
              <Body as="p" size="small" color="subtle" style={{margin: 0}}>Favorites: {favorites.join(', ') || 'None'}</Body>
            </div>
          </DocsCard>

          <DocsCard title="Switch" description="A label with a trailing toggle switch. Clicking anywhere on the row flips the switch and the menu stays open, so several settings can be toggled at once.">
            <div style={{display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap'}}>
              <SelectDropdown>
                <SelectDropdownTrigger asChild>
                  <Button variant="secondary" size="small">Connections</Button>
                </SelectDropdownTrigger>
                <SelectDropdownContent>
                  <SelectDropdownSwitchItem checked={switches.wifi} onCheckedChange={(v) => setSwitch('wifi', v)}>Wi-Fi</SelectDropdownSwitchItem>
                  <SelectDropdownSwitchItem checked={switches.bluetooth} onCheckedChange={(v) => setSwitch('bluetooth', v)}>Bluetooth</SelectDropdownSwitchItem>
                  <SelectDropdownSwitchItem checked={switches.airplane} onCheckedChange={(v) => setSwitch('airplane', v)}>Airplane mode</SelectDropdownSwitchItem>
                  <SelectDropdownSwitchItem disabled checked={false}>Hotspot (unavailable)</SelectDropdownSwitchItem>
                </SelectDropdownContent>
              </SelectDropdown>
              <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                {[switches.wifi && 'Wi-Fi', switches.bluetooth && 'Bluetooth', switches.airplane && 'Airplane'].filter(Boolean).join(', ') || 'All off'}
              </Body>
            </div>
          </DocsCard>

          <DocsCard title="Edit" description="An editable field rendered as an option. It stays read-only until you double-click in; clicking away (or pressing Enter) saves and Escape cancels. Validation messaging shows beneath it.">
            <SelectDropdown>
              <SelectDropdownTrigger asChild>
                <Button variant="secondary" size="small">Rename list</Button>
              </SelectDropdownTrigger>
              <SelectDropdownContent>
                <SelectDropdownLabel>Rename a list</SelectDropdownLabel>
                {lists.map((name, i) => (
                  <SelectDropdownEditItem
                    key={i}
                    value={name}
                    onValueChange={(value) => updateList(i, value)}
                    onSelect={() => setSelectedList(i)}
                    error={name.trim() === '' ? 'List name is required.' : undefined}
                    placeholder="Enter a name"
                    editOnDoubleClick
                    checked={selectedList === i}
                  />
                ))}
              </SelectDropdownContent>
            </SelectDropdown>
          </DocsCard>

          <DocsCard title="Section titles" description="Non-interactive headings group options. Available in regular and bold weights.">
            <SelectDropdown>
              <SelectDropdownTrigger asChild>
                <Button variant="secondary" size="small">Saved lists</Button>
              </SelectDropdownTrigger>
              <SelectDropdownContent>
                <SelectDropdownSectionTitle variant="bold">Recent</SelectDropdownSectionTitle>
                <SelectDropdownCheckmarkItem checked={sortBy === 'weekly'} onSelect={() => setSortBy('weekly')}>Weekly groceries</SelectDropdownCheckmarkItem>
                <SelectDropdownCheckmarkItem checked={sortBy === 'party'} onSelect={() => setSortBy('party')}>Party supplies</SelectDropdownCheckmarkItem>
                <SelectDropdownSectionTitle>Suggested</SelectDropdownSectionTitle>
                <SelectDropdownCheckmarkItem checked={sortBy === 'pantry'} onSelect={() => setSortBy('pantry')}>Pantry staples</SelectDropdownCheckmarkItem>
                <SelectDropdownCheckmarkItem checked={sortBy === 'cleaning'} onSelect={() => setSortBy('cleaning')}>Cleaning</SelectDropdownCheckmarkItem>
              </SelectDropdownContent>
            </SelectDropdown>
          </DocsCard>

          <DocsCard title="Section title accordion" description="Expand and collapse groups of options. The header is bold while open.">
            <SelectDropdown>
              <SelectDropdownTrigger asChild>
                <Button variant="secondary" size="small">Filters</Button>
              </SelectDropdownTrigger>
              <SelectDropdownContent>
                <SelectDropdownAccordionSection title="Brand" defaultOpen>
                  <SelectDropdownCheckboxItem checked={brandGV} onCheckedChange={setBrandGV}>Great Value</SelectDropdownCheckboxItem>
                  <SelectDropdownCheckboxItem checked={brandMS} onCheckedChange={setBrandMS}>Marketside</SelectDropdownCheckboxItem>
                </SelectDropdownAccordionSection>
                <SelectDropdownAccordionSection title="Price">
                  <SelectDropdownCheckmarkItem checked={sortBy === 'p1'} onSelect={() => setSortBy('p1')}>Under $10</SelectDropdownCheckmarkItem>
                  <SelectDropdownCheckmarkItem checked={sortBy === 'p2'} onSelect={() => setSortBy('p2')}>$10 – $25</SelectDropdownCheckmarkItem>
                  <SelectDropdownCheckmarkItem checked={sortBy === 'p3'} onSelect={() => setSortBy('p3')}>$25 &amp; up</SelectDropdownCheckmarkItem>
                </SelectDropdownAccordionSection>
              </SelectDropdownContent>
            </SelectDropdown>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Select Dropdown when a user picks a value from a list rather than triggering actions. Reflect the selected state immediately — a checkmark or filled radio plus a bold label. Use radio or checkmark for a single choice, checkbox items for multi-select, description items for richer options, and the inline edit item to rename the chosen value. Group related options with section titles and collapse long lists behind accordion sections. For navigation and commands, use Menu; for right-click actions, use Context Menu."
        defaultValue="SelectDropdown with SelectDropdownTrigger, SelectDropdownContent, and select items"
      />
    </PageWrapper>
  );
}
