import * as React from 'react';

import {Button, ButtonGroup} from '../components/Button/Button';
import {
  ActionTile,
  type ActionTileTitleWeight,
  type ActionTileVariant,
} from '../components/ActionTile/ActionTile';
import {AttachmentTile} from '../components/AttachmentTile/AttachmentTile';
import {Checkbox} from '../components/Checkbox/Checkbox';
import {PlaceholderMedia} from '../common/PlaceholderMedia';
import {SpotIcon} from '../components/SpotIcon/SpotIcon';
import {
  CartIcon,
  GiftIcon,
  SaveIcon,
  SettingsIcon,
  StarIcon,
  TagIcon,
} from '../components/Icons/Icons';
import {Body} from '../components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const VARIANTS: Array<{
  variant: ActionTileVariant;
  label: string;
  description: string;
}> = [
  {
    variant: 'full',
    label: 'Full',
    description:
      'Vertical, large square-ish tile (≈130×124). Icon pinned top, title bottom.',
  },
  {
    variant: 'tall',
    label: 'Tall',
    description: 'Vertical, narrower and taller. Icon top, title bottom.',
  },
  {
    variant: 'short',
    label: 'Short',
    description: 'Vertical and compact. Icon and title stacked close together.',
  },
  {
    variant: 'horizontal',
    label: 'Horizontal',
    description: 'Row layout — the icon leads and the title sits to its right.',
  },
];

const TITLE_WEIGHTS: Array<{
  value: ActionTileTitleWeight;
  label: string;
  description: string;
}> = [
  {
    value: 'bold',
    label: 'Bold',
    description: 'Body Bold (700) title. The default, matching the Figma spec.',
  },
  {
    value: 'regular',
    label: 'Regular',
    description: 'Body Regular (400) title for a lighter, less emphatic label.',
  },
];

const LEADING_OPTIONS = ['icon', 'spotIcon'] as const;
type LeadingOption = (typeof LEADING_OPTIONS)[number];
const LEADING_LABELS: Record<LeadingOption, string> = {
  icon: 'Icon',
  spotIcon: 'Spot Icon',
};

// Picks an appropriately sized leading slot for the chosen variant: horizontal
// tiles take a medium (24px) icon, the vertical variants take a large (32px) one.
function renderLeading(
  option: LeadingOption,
  variant: ActionTileVariant,
  icon: React.ReactElement
) {
  if (option === 'spotIcon') {
    return (
      <SpotIcon size={variant === 'horizontal' ? 'small' : 'large'}>
        {icon}
      </SpotIcon>
    );
  }
  return React.cloneElement(icon, {
    size: variant === 'horizontal' ? 'medium' : 'large',
  });
}

const ATTACHMENT_STATES: Array<{className?: string; label: string; description: string}> = [
  {label: 'Enabled', description: 'Default state.'},
  {className: 'hover', label: 'Hover', description: 'Tinted fill, 2px border.'},
  {className: 'focused', label: 'Focused', description: 'Tinted fill, 2px border.'},
  {className: 'pressed', label: 'Pressed', description: 'Darker fill, 2px border.'},
];

// The icon-variant leading pictogram: a green, square Spot Icon.
function attachmentLeading() {
  return (
    <SpotIcon shape="square" color="green" size="small">
      <SaveIcon decorative />
    </SpotIcon>
  );
}

export default function ActionTilePage() {
  const [variant, setVariant] = React.useState<ActionTileVariant>('full');
  const [titleWeight, setTitleWeight] =
    React.useState<ActionTileTitleWeight>('bold');
  const [leading, setLeading] = React.useState<LeadingOption>('icon');
  const [selected, setSelected] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  // Single-select picker example.
  const PICKER = [
    {id: 'star', label: 'Favorites', icon: <StarIcon decorative />},
    {id: 'gift', label: 'Gifting', icon: <GiftIcon decorative />},
    {id: 'tag', label: 'Deals', icon: <TagIcon decorative />},
    {id: 'cart', label: 'Cart', icon: <CartIcon decorative />},
  ];
  const [picked, setPicked] = React.useState('star');

  // Attachment Tile dismiss demos — clicking the X hides each tile; Reset
  // restores them.
  const [variantsShown, setVariantsShown] = React.useState({icon: true, image: true});
  const [statesShown, setStatesShown] = React.useState<Record<string, boolean>>({
    Enabled: true,
    Hover: true,
    Focused: true,
    Pressed: true,
    Disabled: true,
  });

  // Attachment Tile "remove" demo — tiles disappear as they're removed.
  const [attachments, setAttachments] = React.useState([
    {id: 'sheet', title: 'Q3 forecast', description: 'Spreadsheet · 248 KB'},
    {id: 'deck', title: 'Launch deck', description: 'Presentation · 1.2 MB'},
    {id: 'doc', title: 'Spec notes', description: 'Document · 96 KB'},
  ]);
  const removeAttachment = (id: string) =>
    setAttachments((current) => current.filter((item) => item.id !== id));
  const resetAttachments = () =>
    setAttachments([
      {id: 'sheet', title: 'Q3 forecast', description: 'Spreadsheet · 248 KB'},
      {id: 'deck', title: 'Launch deck', description: 'Presentation · 1.2 MB'},
      {id: 'doc', title: 'Spec notes', description: 'Document · 96 KB'},
    ]);

  const selectedVariant =
    VARIANTS.find((item) => item.variant === variant) ?? VARIANTS[0];

  return (
    <PageWrapper
      title="Tiles"
      category="Core Components"
      description="Compact tile components. Action Tile is a selectable button that pairs a leading icon (or Spot Icon) with a short title — choose full, tall, short (vertical), or horizontal, and drive its activated state with selected. Attachment Tile is a removable chip representing an attached file (icon variant) or image (image variant), each with a trailing close button."
    >
      <ExampleSection
        title="Action Tile · Configuration"
        description="Preview the variant, leading slot, title weight, activated, and disabled state. Click the preview to toggle its activated state."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h4" size="medium" weight="alt" style={{margin: 0}}>
                  Variant
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  {selectedVariant.description}
                </Body>
                <ButtonGroup aria-label="Action Tile variant">
                  {VARIANTS.map((item) => (
                    <Button
                      key={item.variant}
                      size="small"
                      variant={variant === item.variant ? 'primary' : 'secondary'}
                      aria-pressed={variant === item.variant}
                      onClick={() => setVariant(item.variant)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h4" size="medium" weight="alt" style={{margin: 0}}>
                  Leading slot
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Lead with a plain Icon or a Spot Icon. The slot accepts any node.
                </Body>
                <ButtonGroup aria-label="Action Tile leading slot">
                  {LEADING_OPTIONS.map((item) => (
                    <Button
                      key={item}
                      size="small"
                      variant={leading === item ? 'primary' : 'secondary'}
                      aria-pressed={leading === item}
                      onClick={() => setLeading(item)}
                    >
                      {LEADING_LABELS[item]}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h4" size="medium" weight="alt" style={{margin: 0}}>
                  Title weight
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  {TITLE_WEIGHTS.find((item) => item.value === titleWeight)?.description}
                </Body>
                <ButtonGroup aria-label="Action Tile title weight">
                  {TITLE_WEIGHTS.map((item) => (
                    <Button
                      key={item.value}
                      size="small"
                      variant={titleWeight === item.value ? 'primary' : 'secondary'}
                      aria-pressed={titleWeight === item.value}
                      onClick={() => setTitleWeight(item.value)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
              <Checkbox
                label="Activated (selected)"
                checked={selected}
                onChange={(event) => setSelected(event.target.checked)}
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
              title={`${selectedVariant.label} · ${titleWeight} title`}
              description={selectedVariant.description}
            >
              <div style={{display: 'flex', flexWrap: 'wrap', gap: 16}}>
                <ActionTile
                  variant={variant}
                  titleWeight={titleWeight}
                  selected={selected}
                  disabled={disabled}
                  leading={renderLeading(leading, variant, <StarIcon decorative />)}
                  onClick={() => setSelected((value) => !value)}
                >
                  Title
                </ActionTile>
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Variants"
        description="full, tall, and short are the vertical size variants (icon over title) at decreasing heights; horizontal is the layout variant, placing the icon before the title in a row."
      >
        <DocsGrid>
          {VARIANTS.map((item) => (
            <DocsCard key={item.variant} title={item.label} description={item.description}>
              <div style={{display: 'flex', alignItems: 'flex-start', gap: 16}}>
                <ActionTile
                  variant={item.variant}
                  leading={renderLeading('icon', item.variant, <StarIcon decorative />)}
                >
                  Title
                </ActionTile>
              </div>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Title weight"
        description="Pick the title weight to match the emphasis you need. Bold (700) is the default; regular (400) reads lighter — useful when many tiles share a screen."
      >
        <DocsGrid>
          {TITLE_WEIGHTS.map((item) => (
            <DocsCard key={item.value} title={item.label} description={item.description}>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: 16}}>
                <ActionTile
                  variant="full"
                  titleWeight={item.value}
                  leading={renderLeading('icon', 'full', <StarIcon decorative />)}
                >
                  Title
                </ActionTile>
                <ActionTile
                  variant="horizontal"
                  titleWeight={item.value}
                  leading={renderLeading('icon', 'horizontal', <StarIcon decorative />)}
                >
                  Title
                </ActionTile>
              </div>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Leading slot"
        description="The leading slot takes any node — most often a plain Icon or a Spot Icon. Pass a large (32px) icon for the vertical variants and a medium (24px) icon for horizontal so it aligns with the title."
      >
        <DocsGrid>
          <DocsCard title="Icon" description="A plain icon at the variant's expected size.">
            <div style={{display: 'flex', flexWrap: 'wrap', gap: 16}}>
              <ActionTile variant="full" leading={<StarIcon decorative size="large" />}>
                Favorites
              </ActionTile>
              <ActionTile
                variant="horizontal"
                leading={<SettingsIcon decorative size="medium" />}
              >
                Settings
              </ActionTile>
            </div>
          </DocsCard>
          <DocsCard title="Spot Icon" description="A decorative Spot Icon for more visual weight.">
            <div style={{display: 'flex', flexWrap: 'wrap', gap: 16}}>
              <ActionTile
                variant="full"
                leading={<SpotIcon size="large"><GiftIcon decorative /></SpotIcon>}
              >
                Gifting
              </ActionTile>
              <ActionTile
                variant="horizontal"
                leading={<SpotIcon size="small"><TagIcon decorative /></SpotIcon>}
              >
                Deals
              </ActionTile>
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="States"
        description="Tiles respond to hover, focus, and pressed input, support an activated (selected) state with a blue border, and a disabled state."
      >
        <DocsGrid>
          <DocsCard title="Enabled" description="Default interactive state.">
            <ActionTile variant="full" leading={<StarIcon decorative size="large" />}>
              Title
            </ActionTile>
          </DocsCard>
          <DocsCard title="Activated" description="Selected; reflected as aria-pressed.">
            <ActionTile variant="full" selected leading={<StarIcon decorative size="large" />}>
              Title
            </ActionTile>
          </DocsCard>
          <DocsCard title="Disabled" description="Non-interactive; signals the tile cannot be used.">
            <ActionTile variant="full" disabled leading={<StarIcon decorative size="large" />}>
              Title
            </ActionTile>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Single-select picker"
        description="Action Tiles work well as a single-select group: drive selected from your own state and toggle on click. Each tile sets aria-pressed so assistive tech announces the active choice."
      >
        <DocsCard
          title="Pick a category"
          description={`Selected: ${PICKER.find((item) => item.id === picked)?.label}`}
        >
          <div style={{display: 'flex', flexWrap: 'wrap', gap: 16}}>
            {PICKER.map((item) => (
              <ActionTile
                key={item.id}
                variant="full"
                selected={picked === item.id}
                leading={React.cloneElement(item.icon, {size: 'large'})}
                onClick={() => setPicked(item.id)}
              >
                {item.label}
              </ActionTile>
            ))}
          </div>
        </DocsCard>
      </ExampleSection>

      <ExampleSection
        title="Attachment Tile"
        description="A removable chip representing an attached file or image. The icon variant pairs a leading green Spot Icon (square) with a title and description; the image variant shows a compact square thumbnail. The close button stays hidden until you hover the tile (or focus it with the keyboard) — hover, click the X to dismiss, then Reset to restore."
      >
        <DocsCard
          title="Variants"
          description="Hover a tile to reveal its X, then click to dismiss it."
        >
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12}}>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 16}}>
              {variantsShown.icon && (
                <AttachmentTile
                  variant="icon"
                  leading={attachmentLeading()}
                  title="Q3 forecast"
                  description="Spreadsheet · 248 KB"
                  removeLabel="Remove Q3 forecast"
                  onRemove={() => setVariantsShown((s) => ({...s, icon: false}))}
                />
              )}
              {variantsShown.image && (
                <AttachmentTile
                  variant="image"
                  image={<PlaceholderMedia shape="rect" width={40} height={40} />}
                  removeLabel="Remove image"
                  onRemove={() => setVariantsShown((s) => ({...s, image: false}))}
                />
              )}
              {!variantsShown.icon && !variantsShown.image && (
                <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                  Both dismissed.
                </Body>
              )}
            </div>
            <Button
              size="small"
              variant="secondary"
              onClick={() => setVariantsShown({icon: true, image: true})}
            >
              Reset
            </Button>
          </div>
        </DocsCard>
      </ExampleSection>

      <ExampleSection
        title="Attachment Tile · States"
        description="Tiles respond to hover, focus, and pressed input, and support a disabled state. The interactive states are shown statically here — note the tile keeps its size across states. Click an X to dismiss; Reset restores all."
      >
        <DocsGrid>
          {ATTACHMENT_STATES.map((item) =>
            statesShown[item.label] ? (
              <DocsCard key={item.label} title={item.label} description={item.description}>
                <AttachmentTile
                  UNSAFE_className={item.className}
                  variant="icon"
                  leading={attachmentLeading()}
                  title="Q3 forecast"
                  description="Spreadsheet · 248 KB"
                  removeLabel={`Remove (${item.label})`}
                  onRemove={() =>
                    setStatesShown((s) => ({...s, [item.label]: false}))
                  }
                />
              </DocsCard>
            ) : null
          )}
          {statesShown.Disabled && (
            <DocsCard title="Disabled" description="Non-interactive; the remove button is disabled too.">
              <AttachmentTile
                disabled
                variant="icon"
                leading={attachmentLeading()}
                title="Q3 forecast"
                description="Spreadsheet · 248 KB"
              />
            </DocsCard>
          )}
        </DocsGrid>
        <div style={{marginTop: 16}}>
          <Button
            size="small"
            variant="secondary"
            onClick={() =>
              setStatesShown({
                Enabled: true,
                Hover: true,
                Focused: true,
                Pressed: true,
                Disabled: true,
              })
            }
          >
            Reset
          </Button>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Attachment Tile · Removing"
        description="Wire onRemove to drop the attachment from your own state. Hover a tile to reveal its X and click to remove it; use Reset to restore them."
      >
        <DocsCard
          title="Attached files"
          description={`${attachments.length} attachment${attachments.length === 1 ? '' : 's'}`}
        >
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12}}>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: 12}}>
              {attachments.map((item) => (
                <AttachmentTile
                  key={item.id}
                  variant="icon"
                  leading={attachmentLeading()}
                  title={item.title}
                  description={item.description}
                  removeLabel={`Remove ${item.title}`}
                  onRemove={() => removeAttachment(item.id)}
                />
              ))}
              {attachments.length === 0 && (
                <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                  No attachments.
                </Body>
              )}
            </div>
            <Button size="small" variant="secondary" onClick={resetAttachments}>
              Reset
            </Button>
          </div>
        </DocsCard>
      </ExampleSection>

      <GuidelinesSection
        description="Use Action Tile for a set of related actions or choices where a leading icon aids recognition — a grid of shortcuts or a single-select picker. Match the variant to the layout: full/tall/short for vertical icon-over-title tiles (decreasing heights), horizontal when the icon should lead a row. Drive selected from your own state; it sets aria-pressed for you. Use Attachment Tile to represent an attached file (icon variant, with a title and description) or image (image variant) as a removable chip — always wire onRemove and give the close button a descriptive label. Keep titles short and size leading icons to the variant."
        defaultValue="ActionTile: variant='full', titleWeight='bold' · AttachmentTile: variant='icon'"
      />
    </PageWrapper>
  );
}
