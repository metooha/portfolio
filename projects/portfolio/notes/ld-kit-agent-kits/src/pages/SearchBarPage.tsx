import * as React from 'react';

import {Checkbox} from '../components/Checkbox/Checkbox';
import {SearchBar} from '../components/SearchBar/SearchBar';
import {SettingsIcon, TagIcon} from '../components/Icons';
import {Body} from '../components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

function AutoFocusedSearchBar({initialValue = '', label = 'Search bar example'}: {initialValue?: string; label?: string}) {
  const [val, setVal] = React.useState(initialValue);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const input = containerRef.current?.querySelector('input');
    input?.focus();
  }, []);

  return (
    <div ref={containerRef}>
      <SearchBar aria-label={label}
        value={val}
        onChange={setVal}
        onClear={() => setVal('')}
        onCancel={() => setVal('')}
        placeholder="Enter search term(s)"
      />
    </div>
  );
}

function InlineSearchBar({
  size,
  initialValue = '',
  leadingIcon,
  trailingIcon,
}: {
  size: 'small' | 'large';
  initialValue?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}) {
  const [val, setVal] = React.useState(initialValue);
  return (
    <SearchBar
      variant="inline"
      size={size}
      value={val}
      onChange={setVal}
      onClear={() => setVal('')}
      placeholder="Enter search term(s)"
      leadingIcon={leadingIcon}
      trailingIcon={trailingIcon}
    />
  );
}

export default function SearchBarPage() {
  const [value, setValue] = React.useState('');
  const [disabled, setDisabled] = React.useState(false);

  return (
    <PageWrapper
      title="Search Bar"
      category="WCP Components"
      description="Search input with clear button. The pill variant is used in Walmart mobile and desktop headers; the inline variant (small/large) searches within a section of a page."
    >
      <ExampleSection
        title="Component Configuration"
        description="Try typing to activate the search bar. The clear button appears once text is entered."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>State</Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Toggle disabled to preview the muted, non-interactive state.
                </Body>
              </div>
              <Checkbox label="Disabled" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} />
            </>
          }
          preview={
            <DocsCard title="Live preview" description="The cancel link appears on focus; the clear button appears once text is entered.">
              <SearchBar aria-label="Activated search bar example"
                value={value}
                onChange={setValue}
                onClear={() => setValue('')}
                onCancel={() => setValue('')}
                placeholder="Enter search term(s)"
                disabled={disabled}
              />
              {value ? (
                <Body as="p" size="small" color="subtle" style={{margin: '12px 0 0'}}>
                  Current value: "{value}"
                </Body>
              ) : null}
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="States"
        description="Four interaction states. Hover is desktop-only. Activated shows a focus ring and Cancel link; the entered variant shows the typed value with a clear button."
      >
        <DocsGrid>
          <DocsCard title="Enabled" description="Empty, default resting state.">
            <SearchBar aria-label="Default search bar" value="" onChange={() => {}} placeholder="Enter search term(s)" />
          </DocsCard>
          <DocsCard title="Activated — empty" description="Focused, blue border, with cancel link.">
            <AutoFocusedSearchBar label="Activated empty search bar" />
          </DocsCard>
          <DocsCard title="Activated — with value" description="Focused with text and clear button.">
            <AutoFocusedSearchBar initialValue="running shoes" label="Activated search bar with value" />
          </DocsCard>
          <DocsCard title="Disabled" description="Muted, not interactive.">
            <SearchBar aria-label="Disabled search bar" value="" onChange={() => {}} placeholder="Enter search term(s)" disabled />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Inline variant"
        description="A compact, rounded-rectangle field for searching within a section of a page (e.g. filtering a table or list). Comes in small (32px) and large (40px) sizes and has no Cancel affordance."
      >
        <DocsGrid>
          <DocsCard title="Small" description="32px tall with a 16px leading icon.">
            <InlineSearchBar size="small" />
          </DocsCard>
          <DocsCard title="Large" description="40px tall with a 24px leading icon.">
            <InlineSearchBar size="large" />
          </DocsCard>
          <DocsCard title="With value" description="The clear (×) button takes the trailing slot when text is entered.">
            <InlineSearchBar size="large" initialValue="search term" />
          </DocsCard>
          <DocsCard title="Disabled" description="Muted, not interactive.">
            <SearchBar variant="inline" size="large" value="" onChange={() => {}} placeholder="Enter search term(s)" disabled />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Leading & trailing icons"
        description="Override the default search icon via leadingIcon, and add a trailing affordance via trailingIcon. The trailing icon shows when the field is empty; the clear button replaces it once text is entered."
      >
        <DocsGrid>
          <DocsCard title="Custom leading icon" description="leadingIcon={<TagIcon />}">
            <InlineSearchBar size="large" leadingIcon={<TagIcon decorative />} />
          </DocsCard>
          <DocsCard title="Trailing icon" description="trailingIcon={<SettingsIcon />} for an inline filter affordance.">
            <InlineSearchBar size="large" trailingIcon={<SettingsIcon decorative />} />
          </DocsCard>
          <DocsCard title="No leading icon" description="Pass leadingIcon={null} to remove it entirely.">
            <InlineSearchBar size="large" leadingIcon={null} />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Search Bar at the top of search surfaces — headers, mobile search overlays, in-page search panels. Keep placeholder copy short and intent-led ('Search products', 'Search orders'). Always wire up onClear so users can reset without clearing the focus, and pair with onCancel when the bar lives inside a dismissible overlay."
        defaultValue="placeholder='Enter search term(s)'"
      />
    </PageWrapper>
  );
}
