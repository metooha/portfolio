import * as React from 'react';

import {Button, ButtonGroup} from '../components/Button/Button';
import {Checkbox} from '../components/Checkbox/Checkbox';
import {ContentMessage, type ContentMessageSize} from '../components/ContentMessage/ContentMessage';
import {Body} from '../components/Text/Text';
import {ILLUSTRATION_META, ILLUSTRATION_SVGS} from '../illustrations';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

type IllustrationType = keyof typeof ILLUSTRATION_SVGS;
type MessageScenario = 'empty' | 'error' | 'waiting' | 'permission';

interface IllustrationProps {
  type: IllustrationType;
  name: string;
  size?: number;
}

const SCENARIOS: Array<{
  value: MessageScenario;
  label: string;
  title: string;
  body: string;
  actionLabel: string;
  media?: IllustrationProps;
}> = [
  {
    value: 'empty',
    label: 'Empty',
    title: 'No results found',
    body: 'Try adjusting your search or filter criteria to find what you are looking for.',
    actionLabel: 'Clear filters',
    media: {type: 'spot', name: "Couldn'tFindWhat", size: 200},
  },
  {
    value: 'error',
    label: 'Error',
    title: 'Unable to load data',
    body: 'We could not reach the server. Check your connection and try again in a few moments.',
    actionLabel: 'Try again',
    media: {type: 'spot', name: 'NoInternetConnection', size: 200},
  },
  {
    value: 'waiting',
    label: 'Waiting',
    title: 'Your associate is on the way',
    body: 'We will notify you when they arrive. You can track progress from order details.',
    actionLabel: 'Track order',
    media: {type: 'spot', name: 'AssociateOnTheWay', size: 200},
  },
  {
    value: 'permission',
    label: 'Permission',
    title: 'Access denied',
    body: 'You do not have permission to view this content. Contact your administrator to request access.',
    actionLabel: 'Request access',
  },
];

function Illustration({type, name, size}: IllustrationProps) {
  const svg = ILLUSTRATION_SVGS[type]?.[name];
  const meta = ILLUSTRATION_META[type]?.[name];

  if (!svg) return null;

  const intrinsic = meta ?? {width: 72, height: 72};
  const aspect = intrinsic.height / intrinsic.width;
  const width = size ?? intrinsic.width;
  const height = size ? size * aspect : intrinsic.height;

  // Make the SVG itself decorative — accessible name lives on the wrapper div.
  const decorativeSvg = svg.replace(/^(\s*<svg\b)/, '$1 aria-hidden="true" role="presentation"');

  return (
    <div
      role="img"
      aria-label={name}
      style={{
        width,
        height,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{__html: decorativeSvg}}
    />
  );
}

function ContentMessageExample({
  scenario,
  size = 'small',
  showMedia = true,
  showAction = true,
}: {
  scenario: MessageScenario;
  size?: ContentMessageSize;
  showMedia?: boolean;
  showAction?: boolean;
}) {
  const config = SCENARIOS.find((item) => item.value === scenario) ?? SCENARIOS[0];

  return (
    <ContentMessage
      size={size}
      title={config.title}
      media={showMedia && config.media ? <Illustration {...config.media} /> : undefined}
      actions={
        showAction ? (
          <Button variant={scenario === 'empty' ? 'secondary' : 'primary'} onClick={() => {}}>
            {config.actionLabel}
          </Button>
        ) : undefined
      }
    >
      <Body as="p" size={size === 'large' ? 'large' : 'medium'} style={{margin: 0}}>
        {config.body}
      </Body>
    </ContentMessage>
  );
}

export default function ContentMessagePage() {
  const [scenario, setScenario] = React.useState<MessageScenario>('empty');
  const [size, setSize] = React.useState<ContentMessageSize>('small');
  const [showMedia, setShowMedia] = React.useState(true);
  const [showAction, setShowAction] = React.useState(true);
  const activeScenario = SCENARIOS.find((item) => item.value === scenario) ?? SCENARIOS[0];

  return (
    <PageWrapper
      title="Content Message"
      category="Core Components"
      description="Structured empty, error, permission, and waiting-state messages with optional media and actions."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview scenario, size, illustration, and action behavior in a single content message."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Scenario
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Choose the message purpose before tuning size and content.
                </Body>
              </div>
              <ButtonGroup aria-label="Content message scenario">
                {SCENARIOS.map((item) => (
                  <Button
                    key={item.value}
                    size="small"
                    variant={scenario === item.value ? 'primary' : 'secondary'}
                    aria-pressed={scenario === item.value}
                    onClick={() => setScenario(item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>
              <ButtonGroup aria-label="Content message size">
                {(['small', 'large'] as ContentMessageSize[]).map((item) => (
                  <Button
                    key={item}
                    size="small"
                    variant={size === item ? 'primary' : 'secondary'}
                    aria-pressed={size === item}
                    onClick={() => setSize(item)}
                  >
                    {item === 'small' ? 'Small' : 'Large'}
                  </Button>
                ))}
              </ButtonGroup>
              <div style={{display: 'grid', gap: 16}}>
                <Checkbox label="Show media" checked={showMedia} onChange={(event) => setShowMedia(event.target.checked)} />
                <Checkbox label="Show action" checked={showAction} onChange={(event) => setShowAction(event.target.checked)} />
              </div>
            </>
          }
          preview={
            <DocsCard title={`${activeScenario.label} message`} description={activeScenario.body}>
              <ContentMessageExample scenario={scenario} size={size} showMedia={showMedia} showAction={showAction} />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Scenarios"
        description="Content messages should make the state obvious and provide a next step when one exists."
      >
        <DocsGrid>
          {SCENARIOS.map((item) => (
            <DocsCard key={item.value} title={item.label} description={item.body}>
              <ContentMessageExample scenario={item.value} />
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Content Message when the empty, error, waiting, or permission state is the primary content in an area. Keep the title direct, explain the state in one short paragraph, and include an action only when the user can recover or continue from this context. Use large size for page-dominant states and small size inside contained regions."
        defaultValue="size='small'"
      />
    </PageWrapper>
  );
}
