import * as React from 'react';

import {Badge, type BadgeColor} from '../components/Badge/Badge';
import {Button, ButtonGroup} from '../components/Button/Button';
import {Checkbox} from '../components/Checkbox/Checkbox';
import {Body} from '../components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const PRIMARY_COLORS: Array<{color: BadgeColor; label: string; description: string}> = [
  {color: 'brand', label: 'Brand', description: 'Use for Walmart brand emphasis or primary notification counts.'},
  {color: 'blue', label: 'Blue', description: 'Use for neutral informational counts and secondary status.'},
  {color: 'green', label: 'Green', description: 'Use for positive, active, or completed statuses.'},
  {color: 'yellow', label: 'Yellow', description: 'Use for pending, caution, or needs-review states.'},
  {color: 'red', label: 'Red', description: 'Use for errors, urgent issues, or failed states.'},
  {color: 'gray', label: 'Gray', description: 'Use for inactive, empty, or low-emphasis counts.'},
];

const EXTENDED_COLORS: BadgeColor[] = [
  'brandBold',
  'spark',
  'cyan',
  'teal',
  'orange',
  'pink',
  'purple',
  'info',
  'positive',
  'warning',
  'negative',
  'neutral',
  'edited',
];

type BadgeDotSize = 'small' | 'medium';

const DOT_SIZES: Array<{size: BadgeDotSize; label: string}> = [
  {size: 'medium', label: 'Medium · 12'},
  {size: 'small', label: 'Small · 8'},
];

function BadgePreview({color, showText, dotSize}: {color: BadgeColor; showText: boolean; dotSize: BadgeDotSize}) {
  return showText ? (
    <Badge color={color} aria-hidden="true">12</Badge>
  ) : (
    <Badge color={color} size={dotSize} aria-hidden="true" />
  );
}

export default function BadgePage() {
  const [selectedColor, setSelectedColor] = React.useState<BadgeColor>('brand');
  const [showText, setShowText] = React.useState(true);
  const [dotSize, setDotSize] = React.useState<BadgeDotSize>('medium');
  const selectedColorLabel =
    PRIMARY_COLORS.find((item) => item.color === selectedColor)?.label ?? selectedColor;

  return (
    <PageWrapper
      title="Badge"
      category="Core Components"
      description="Compact count and status indicators that sit next to labels, navigation items, and controls."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview how badge color and text content affect the visual weight of the indicator."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Color
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Choose the semantic color that best matches the count or status.
                </Body>
              </div>

              <ButtonGroup aria-label="Badge color">
                {PRIMARY_COLORS.map((item) => (
                  <Button
                    key={item.color}
                    size="small"
                    variant={selectedColor === item.color ? 'primary' : 'secondary'}
                    aria-pressed={selectedColor === item.color}
                    onClick={() => setSelectedColor(item.color)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>

              <Checkbox
                label="Show count text"
                checked={showText}
                onChange={(event) => setShowText(event.target.checked)}
              />

              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Dot size
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Only applies when no count text is shown. Small (8×8) suits compact surfaces; medium (12×12) is the default.
                </Body>
              </div>
              <ButtonGroup aria-label="Badge dot size">
                {DOT_SIZES.map((item) => (
                  <Button
                    key={item.size}
                    size="small"
                    variant={dotSize === item.size ? 'primary' : 'secondary'}
                    aria-pressed={dotSize === item.size}
                    disabled={showText}
                    onClick={() => setDotSize(item.size)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>
            </>
          }
          preview={
            <DocsCard
              title={`${selectedColorLabel} preview`}
              description={showText ? 'Text badges work best for short counts or compact labels.' : 'Dot badges work best when the nearby label already explains the status.'}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                <Button
                  variant="tertiary"
                  aria-label={showText ? 'Messages, 12 new messages' : 'Messages, new messages'}
                >
                  Messages
                </Button>
                <BadgePreview color={selectedColor} showText={showText} dotSize={dotSize} />
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Dot sizes"
        description="Dot badges have two sizes. Use the small dot for status indicators that sit close to dense affordances like avatars or icon buttons; use the default dot when it stands alone next to a control or label."
      >
        <DocsGrid>
          <DocsCard title="Medium · 12×12" description="Default dot. Use next to buttons, list rows, or section labels.">
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <Button variant="tertiary" aria-label="Messages, new messages">Messages</Button>
              <Badge color="brand" aria-hidden="true" />
            </div>
          </DocsCard>
          <DocsCard title="Small · 8×8" description="Use for compact surfaces like avatars, icon buttons, and nav items.">
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <Button variant="tertiary" aria-label="Messages, new messages">Messages</Button>
              <Badge color="brand" size="small" aria-hidden="true" />
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Primary colors"
        description="Use the smallest color set that clearly communicates status."
      >
        <DocsGrid>
          {PRIMARY_COLORS.map((item) => (
            <DocsCard key={item.color} title={item.label} description={item.description}>
              <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                <Badge color={item.color}>12</Badge>
                <Badge color={item.color} />
              </div>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Extended palette"
        description="Extended colors are available for product-specific status systems, but should not replace semantic meaning."
      >
        <DocsGrid minColumnWidth={180} gap={16}>
          {EXTENDED_COLORS.map((color) => (
            <DocsCard key={color} title={color}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Badge color={color}>8</Badge>
              </div>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Common use cases"
        description="Badges should stay close to the label or control they quantify."
      >
        <DocsGrid>
          <DocsCard title="Notification count" description="Pair with a control when the badge counts new or pending items.">
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <Button variant="tertiary" aria-label="Messages, 12 new messages">Messages</Button>
              <Badge color="brand" aria-hidden="true">12</Badge>
            </div>
          </DocsCard>

          <DocsCard title="Status summary" description="Use semantic colors to make multiple statuses scannable.">
            <div style={{display: 'grid', gap: 12}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                <Body as="span" size="medium">Active orders</Body>
                <Badge color="green">5</Badge>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                <Body as="span" size="medium">Pending reviews</Body>
                <Badge color="yellow">3</Badge>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                <Body as="span" size="medium">Issues</Body>
                <Badge color="red">2</Badge>
              </div>
            </div>
          </DocsCard>

          <DocsCard title="Empty state" description="Use gray or neutral when a count is empty or informational only.">
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <Button variant="secondary" aria-label="View cart, 0 items">View cart</Button>
              <Badge color="gray" aria-hidden="true">0</Badge>
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Badge vs. Tag: use Badge for counts and presence dots (numeric, glanceable). Use Tag for short textual status labels like New, Ready, Beta, or Out of stock. They are not interchangeable — a text pill like 'New' is a Tag, even if the original code reached for Badge. Keep badge text to one to three characters, choose colors by meaning (brand or blue for notifications, green for positive, yellow for caution, red for urgent, gray for empty), and pair every dot badge with nearby text that explains what it means. See BADGE_TO_TAG_MIGRATION.md for the full decision table."
        defaultValue="color='blue'"
      >
        <div style={{display: 'grid', gap: 8, minWidth: 0}}>
          <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
            Accessibility — pairing badges with interactive elements
          </Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.6'}}>
            Badge is a visual indicator only. When it appears next to a button, link, or nav item, add{' '}
            <code>aria-hidden=&quot;true&quot;</code> to the badge and encode the count in the parent
            element&apos;s <code>aria-label</code>. Screen readers announce the button as one unit — the
            badge text is never read separately.
          </Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.6'}}>
            Use the format <strong>&ldquo;{'{label}'}, {'{count}'} {'{description}'}&rdquo;</strong>:
          </Body>
          <ul style={{margin: 0, paddingLeft: 20}}>
            <li><Body as="span" size="medium" color="subtle"><code>aria-label=&quot;Messages, 12 new messages&quot;</code> — count badge</Body></li>
            <li><Body as="span" size="medium" color="subtle"><code>aria-label=&quot;Messages, new messages&quot;</code> — dot badge (omit count, describe presence)</Body></li>
            <li><Body as="span" size="medium" color="subtle"><code>aria-label=&quot;View cart, 0 items&quot;</code> — empty state</Body></li>
          </ul>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.6'}}>
            Standalone badges in non-interactive contexts (table cells, status rows) do not need{' '}
            <code>aria-hidden</code> — they are read naturally in DOM order.
          </Body>
        </div>
      </GuidelinesSection>
    </PageWrapper>
  );
}
