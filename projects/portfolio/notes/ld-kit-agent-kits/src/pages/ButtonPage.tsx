import * as React from 'react';

import {
  Button,
  ButtonGroup,
  type ButtonSize,
  type ButtonVariant,
} from '../components/Button/Button';
import {Checkbox} from '../components/Checkbox/Checkbox';
import {ChevronRightIcon} from '../components/Icons/Icons';
import {TextField} from '../components/TextField/TextField';
import {Body} from '../components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const BUTTON_VARIANTS: Array<{variant: ButtonVariant; label: string; description: string}> = [
  {variant: 'primary', label: 'Primary', description: 'Use for the main action in a section or workflow.'},
  {variant: 'secondary', label: 'Secondary', description: 'Use for supporting actions that still need visible emphasis.'},
  {variant: 'tertiary', label: 'Tertiary', description: 'Use for lower-emphasis actions or cancel paths.'},
  {variant: 'destructive', label: 'Destructive', description: 'Use for irreversible or high-risk actions.'},
];

const BUTTON_SIZES: Array<{size: ButtonSize; label: string}> = [
  {size: 'small', label: 'Small'},
  {size: 'medium', label: 'Medium'},
  {size: 'large', label: 'Large'},
];

export default function ButtonPage() {
  const [selectedVariant, setSelectedVariant] = React.useState<ButtonVariant>('primary');
  const [selectedSize, setSelectedSize] = React.useState<ButtonSize>('medium');
  const [isFullWidth, setIsFullWidth] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [formName, setFormName] = React.useState('');
  const [formLoading, setFormLoading] = React.useState(false);

  const handleSubmit = () => {
    setFormLoading(true);
    setTimeout(() => setFormLoading(false), 2000);
  };

  const selectedVariantLabel =
    BUTTON_VARIANTS.find((item) => item.variant === selectedVariant)?.label ?? 'Button';

  return (
    <PageWrapper
      title="Button"
      category="Core Components"
      description="Action controls for submitting, navigating, confirming, cancelling, and making choices with clear visual priority."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview how variant, size, disabled, loading, and full-width settings change a button."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Variant
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Choose the visual priority that matches the action.
                </Body>
              </div>

              <ButtonGroup aria-label="Button variant">
                {BUTTON_VARIANTS.map((item) => (
                  <Button
                    key={item.variant}
                    size="small"
                    variant={selectedVariant === item.variant ? 'primary' : 'secondary'}
                    aria-pressed={selectedVariant === item.variant}
                    onClick={() => setSelectedVariant(item.variant)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>

              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Size
                </Body>
                <ButtonGroup aria-label="Button size">
                  {BUTTON_SIZES.map((item) => (
                    <Button
                      key={item.size}
                      size="small"
                      variant={selectedSize === item.size ? 'primary' : 'secondary'}
                      aria-pressed={selectedSize === item.size}
                      onClick={() => setSelectedSize(item.size)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>

              <div style={{display: 'grid', gap: 16}}>
                <Checkbox label="Full width" checked={isFullWidth} onChange={(event) => setIsFullWidth(event.target.checked)} />
                <Checkbox label="Disabled" checked={isDisabled} onChange={(event) => setIsDisabled(event.target.checked)} />
                <Checkbox label="Loading" checked={isLoading} onChange={(event) => setIsLoading(event.target.checked)} />
              </div>
            </>
          }
          preview={
            <DocsCard
              title={`${selectedVariantLabel} preview`}
              description="Configured button preview using the selected props."
            >
              <div style={{maxWidth: isFullWidth ? 360 : undefined}}>
                <Button
                  variant={selectedVariant}
                  size={selectedSize}
                  disabled={isDisabled}
                  isLoading={isLoading}
                  isFullWidth={isFullWidth}
                >
                  Continue
                </Button>
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Variants"
        description="Order actions by importance so users can identify the safest next step quickly."
      >
        <DocsGrid>
          {BUTTON_VARIANTS.map((item) => (
            <DocsCard key={item.variant} title={item.label} description={item.description}>
              <Button variant={item.variant}>{item.label}</Button>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Sizes and layout"
        description="Choose size by layout density and tap target needs. Use full width in constrained mobile or form layouts."
      >
        <DocsGrid>
          <DocsCard title="Sizes" description="Small works in dense toolbars, medium is the default, and large supports prominent actions.">
            <ButtonGroup>
              {BUTTON_SIZES.map((item) => (
                <Button key={item.size} variant="primary" size={item.size}>
                  {item.label}
                </Button>
              ))}
            </ButtonGroup>
          </DocsCard>

          <DocsCard title="Full width" description="Use full-width buttons when the container is narrow or the action should span the form area.">
            <div style={{maxWidth: 'min(360px, 100%)'}}>
              <Button variant="primary" size="large" isFullWidth>
                Full width action
              </Button>
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Icons and states"
        description="Icons should clarify the action. Disabled and loading states should prevent duplicate or unavailable actions."
      >
        <DocsGrid>
          <DocsCard title="Icon slots" description="Use leading or trailing icons when the icon reinforces the label.">
            <ButtonGroup>
              <Button variant="primary" leading={<i className="ld ld-Plus" />}>
                Add item
              </Button>
              <Button variant="secondary" trailing={<i className="ld ld-ChevronRight" />}>
                Next
              </Button>
              <Button variant="tertiary" leading={<i className="ld ld-Download" />}>
                Download
              </Button>
            </ButtonGroup>
          </DocsCard>

          <DocsCard title="Disabled" description="Use disabled only when the reason is clear from the surrounding UI.">
            <ButtonGroup>
              <Button variant="primary" disabled>Primary</Button>
              <Button variant="secondary" disabled>Secondary</Button>
              <Button variant="tertiary" disabled>Tertiary</Button>
            </ButtonGroup>
          </DocsCard>

          <DocsCard title="Loading" description="Loading replaces button content and blocks interaction while the action is in progress.">
            <ButtonGroup>
              <Button variant="primary" isLoading>Primary</Button>
              <Button variant="secondary" isLoading>Secondary</Button>
              <Button variant="destructive" isLoading>Destructive</Button>
            </ButtonGroup>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Action patterns"
        description="Group related actions by priority and make destructive decisions visually explicit."
      >
        <DocsGrid>
          <DocsCard title="Form actions" description="Pair a low-emphasis escape action with the primary submit action.">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
              }}
              style={{display: 'grid', gap: 16}}
            >
              <TextField
                label="Your name"
                value={formName}
                onChange={(event) => setFormName(event.target.value)}
                textFieldProps={{placeholder: 'Enter your name'}}
              />
              <ButtonGroup>
                <Button variant="tertiary" type="button">Cancel</Button>
                <Button variant="primary" type="submit" isLoading={formLoading}>Submit</Button>
              </ButtonGroup>
            </form>
          </DocsCard>

          <DocsCard title="Destructive action" description="Pair a secondary escape action with a destructive confirmation for irreversible operations.">
            <ButtonGroup>
              <Button variant="secondary">Keep item</Button>
              <Button variant="destructive" leading={<i className="ld ld-Trash" />}>
                Delete permanently
              </Button>
            </ButtonGroup>
          </DocsCard>

          <DocsCard title="Button as link" description="Use href when the action navigates while preserving button styling.">
            <ButtonGroup>
              <Button href="https://www.walmart.com" variant="primary" target="_blank">
                Visit Walmart
              </Button>
              <Button href="#help" variant="secondary">Get help</Button>
            </ButtonGroup>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Shape & Button Ghost"
        description="shape controls the corners: pill (fully rounded, default) or square (4px). Pairing shape='square' with variant='ghost' produces the square, no-fill Button Ghost — a low-emphasis, navigational button that stays transparent until hovered. Add a trailing chevron to signal forward navigation."
      >
        <DocsGrid>
          <DocsCard title="Pill vs. square" description="The shape prop applies to any variant.">
            <ButtonGroup>
              <Button variant="secondary" shape="pill">Pill</Button>
              <Button variant="secondary" shape="square">Square</Button>
            </ButtonGroup>
          </DocsCard>

          <DocsCard title="Button Ghost — pill vs. square" description="variant='ghost' is transparent with no border; shape switches the corners between fully rounded (pill) and 4px (square). Hover to reveal the fill.">
            <ButtonGroup>
              <Button
                variant="ghost"
                shape="pill"
                trailing={<ChevronRightIcon decorative />}
              >
                Pill
              </Button>
              <Button
                variant="ghost"
                shape="square"
                trailing={<ChevronRightIcon decorative />}
              >
                Square
              </Button>
            </ButtonGroup>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use one primary action per section whenever possible. Choose secondary for supporting actions, tertiary for low-emphasis or cancel actions, and destructive only for irreversible work. Button labels should be short action verbs, not vague text like OK when a more specific label is available. Keep related actions grouped and preserve a clear escape path for destructive flows."
        defaultValue="variant='secondary', size='small'"
      />
    </PageWrapper>
  );
}
