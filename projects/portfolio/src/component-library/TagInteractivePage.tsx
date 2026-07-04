import * as React from 'react';

import {Button, ButtonGroup} from '@/app/components/Button/Button';
import {Checkbox} from '@/app/components/Checkbox/Checkbox';
import {StarIcon} from '@/app/components/Icons/Icons';
import {
  TagInteractive,
  type TagInteractiveAction,
  type TagInteractiveColor,
  type TagInteractiveSize,
} from '@/app/components/TagInteractive/TagInteractive';
import {Body} from '@/app/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const ITAG_COLORS: Array<{color: TagInteractiveColor; label: string}> = [
  {color: 'brand', label: 'Brand'},
  {color: 'info', label: 'Info'},
  {color: 'positive', label: 'Positive'},
  {color: 'warning', label: 'Warning'},
  {color: 'negative', label: 'Negative'},
];

const ITAG_ACTIONS: Array<{
  action: TagInteractiveAction;
  label: string;
  description: string;
}> = [
  {
    action: 'dismiss',
    label: 'Dismiss',
    description: 'Trailing × icon. Clicking removes the tag (fires onDismiss).',
  },
  {
    action: 'navigate',
    label: 'Navigate',
    description:
      'Trailing chevron icon, signaling the tag navigates like a button or link (fires onClick).',
  },
];

const ITAG_SIZES: Array<{
  size: TagInteractiveSize;
  label: string;
  description: string;
}> = [
  {
    size: 'small',
    label: 'Small',
    description: 'Caption text (12px). Use in dense rows and compact filters.',
  },
  {
    size: 'medium',
    label: 'Medium',
    description: 'Body Small text (14px). The default for most layouts.',
  },
  {
    size: 'large',
    label: 'Large',
    description: 'Body Medium text (16px). Use for prominent, touch-friendly tags.',
  },
];

export default function TagInteractivePage() {
  const [action, setAction] = React.useState<TagInteractiveAction>('dismiss');
  const [color, setColor] = React.useState<TagInteractiveColor>('brand');
  const [size, setSize] = React.useState<TagInteractiveSize>('medium');
  const [showLeading, setShowLeading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  // Track the self-closing preview so it can be restored after dismissal.
  const [previewClosed, setPreviewClosed] = React.useState(false);

  const selectedColor =
    ITAG_COLORS.find((item) => item.color === color)?.label ?? color;
  const selectedSize =
    ITAG_SIZES.find((item) => item.size === size) ?? ITAG_SIZES[1];

  return (
    <PageWrapper
      title="Tag Interactive"
      category="Core Components"
      description="Interactive labels with hover, focus, pressed, and disabled states. Use action='dismiss' for a removable tag (trailing ×) or action='navigate' for a tag that navigates like a button (trailing chevron). Choose a size to set both the text style and padding."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview the interactive tag color, size, leading icon, and disabled state."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h4" size="medium" weight="alt" style={{margin: 0}}>
                  Action
                </Body>
                <Body
                  as="p"
                  size="small"
                  color="subtle"
                  style={{margin: 0, lineHeight: '1.5'}}
                >
                  {ITAG_ACTIONS.find((item) => item.action === action)?.description}
                </Body>
                <ButtonGroup aria-label="Tag Interactive action">
                  {ITAG_ACTIONS.map((item) => (
                    <Button
                      key={item.action}
                      size="small"
                      variant={action === item.action ? 'primary' : 'secondary'}
                      aria-pressed={action === item.action}
                      onClick={() => setAction(item.action)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h4" size="medium" weight="alt" style={{margin: 0}}>
                  Size
                </Body>
                <Body
                  as="p"
                  size="small"
                  color="subtle"
                  style={{margin: 0, lineHeight: '1.5'}}
                >
                  {selectedSize.description}
                </Body>
                <ButtonGroup aria-label="Tag Interactive size">
                  {ITAG_SIZES.map((item) => (
                    <Button
                      key={item.size}
                      size="small"
                      variant={size === item.size ? 'primary' : 'secondary'}
                      aria-pressed={size === item.size}
                      onClick={() => setSize(item.size)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h4" size="medium" weight="alt" style={{margin: 0}}>
                  Color
                </Body>
                <ButtonGroup aria-label="Tag Interactive color">
                  {ITAG_COLORS.map((item) => (
                    <Button
                      key={item.color}
                      size="small"
                      variant={color === item.color ? 'primary' : 'secondary'}
                      aria-pressed={color === item.color}
                      onClick={() => setColor(item.color)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
              <Checkbox
                label="Show leading icon"
                checked={showLeading}
                onChange={(event) => setShowLeading(event.target.checked)}
              />
              <Checkbox
                label="Disabled"
                checked={disabled}
                onChange={(event) => setDisabled(event.target.checked)}
              />
            </>
          }
          preview={
            <DocsCard
              title={`${selectedColor} ${selectedSize.label.toLowerCase()}`}
              description={selectedSize.description}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  flexWrap: 'wrap',
                }}
              >
                {previewClosed ? (
                  <Button size="small" variant="secondary" onClick={() => setPreviewClosed(false)}>
                    Restore tag
                  </Button>
                ) : (
                  <TagInteractive
                    action={action}
                    color={color}
                    size={size}
                    disabled={disabled}
                    leading={showLeading ? <StarIcon decorative /> : undefined}
                    onDismiss={() => setPreviewClosed(true)}
                  >
                    Free shipping
                  </TagInteractive>
                )}
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Sizes"
        description="Three sizes that each change both the text style and padding: Caption (small), Body Small (medium), and Body Medium (large)."
      >
        <DocsGrid>
          {ITAG_SIZES.map((item) => (
            <DocsCard key={item.size} title={item.label} description={item.description}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  flexWrap: 'wrap',
                }}
              >
                <TagInteractive size={item.size} color="brand" onDismiss={(e) => e.preventDefault()}>
                  Brand
                </TagInteractive>
                <TagInteractive size={item.size} color="info" onDismiss={(e) => e.preventDefault()}>
                  Info
                </TagInteractive>
                <TagInteractive size={item.size} color="positive" onDismiss={(e) => e.preventDefault()}>
                  Positive
                </TagInteractive>
              </div>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Actions"
        description="The trailing icon communicates what the tag does. Use dismiss for removable selections and navigate when the tag leads somewhere."
      >
        <DocsGrid>
          {ITAG_ACTIONS.map((item) => (
            <DocsCard key={item.action} title={item.label} description={item.description}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  flexWrap: 'wrap',
                }}
              >
                <TagInteractive action={item.action} color="brand" onDismiss={(e) => e.preventDefault()}>
                  Label
                </TagInteractive>
                <TagInteractive action={item.action} color="info" onDismiss={(e) => e.preventDefault()}>
                  Label
                </TagInteractive>
              </div>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Semantic colors"
        description="Use color to reinforce the meaning of the tag, not as decoration alone."
      >
        <DocsGrid>
          {ITAG_COLORS.map((item) => (
            <DocsCard
              key={item.color}
              title={item.label}
              description={`${item.label} interactive tag color.`}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  flexWrap: 'wrap',
                }}
              >
                <TagInteractive color={item.color} onDismiss={(e) => e.preventDefault()}>
                  {item.label}
                </TagInteractive>
              </div>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="States"
        description="Interactive tags respond to hover, focus, and pressed input, and support a disabled state."
      >
        <DocsGrid>
          <DocsCard title="Enabled" description="Default interactive state.">
            <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
              <TagInteractive color="brand" onDismiss={(e) => e.preventDefault()}>
                Enabled
              </TagInteractive>
            </div>
          </DocsCard>
          <DocsCard
            title="With leading icon"
            description="Pair with a leading icon to aid recognition."
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
              <TagInteractive
                color="positive"
                leading={<StarIcon decorative />}
                onDismiss={(e) => e.preventDefault()}
              >
                Favorite
              </TagInteractive>
            </div>
          </DocsCard>
          <DocsCard
            title="Disabled"
            description="Non-interactive; signals the tag cannot be removed."
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
              <TagInteractive color="brand" disabled>
                Disabled
              </TagInteractive>
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Tag Interactive when a tag is actionable. With action='dismiss' (default) the whole tag is a button that fires onDismiss, and the trailing × communicates the remove affordance — use it for applied filters, recipients, or chips a user can dismiss. With action='navigate' the trailing chevron signals the tag leads somewhere; handle the click with onClick. For non-interactive, visual-only labels (status, attributes, short metadata) use Tag instead. Keep tag text concise, pair color with meaningful copy, and provide an accessible label via aria-label when the content is not plain text."
        defaultValue="action='dismiss', color='brand', size='medium'"
      />
    </PageWrapper>
  );
}
