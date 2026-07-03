import * as React from 'react';

import {Button, ButtonGroup} from '../components/Button/Button';
import {Checkbox} from '../components/Checkbox/Checkbox';
import {Icon, XWCPIcon, YoutubeWCPIcon, TiktokWCPIcon, PinterestWCPIcon} from '../components/Icons/Icons';
import {ProcessingTrace, TraceTag, type TraceState} from '../components/ProcessingTrace';
import {Spinner} from '../components/Spinner/Spinner';
import {Body, Caption, Heading} from '../components/Text/Text';

import {
  ComponentConfigurationCard,
  PageWrapper,
} from './shared';
import './ProcessingTracePage.css';

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{marginBottom: 24}}>
      <div style={{marginBottom: 16}}>
        <Heading
          as="h2"
          size="small"
          style={{
            margin: description ? '0 0 8px 0' : '0',
            display: 'block',
            lineHeight: '1.2',
          }}
        >
          {title}
        </Heading>
        {description ? (
          <Body
            as="p"
            size="medium"
            color="subtle"
            style={{margin: 0, lineHeight: '1.5'}}
          >
            {description}
          </Body>
        ) : null}
      </div>
      {children}
    </div>
  );
}

/* ============================================================
   Demo 01 — Component configuration
   ============================================================ */

type Visibility = 'collapsed' | 'expanded';

const STATE_OPTIONS: ReadonlyArray<{value: TraceState; label: string}> = [
  {value: 'processing', label: 'Processing'},
  {value: 'success', label: 'Success'},
  {value: 'failure', label: 'Failure'},
];

const PREVIEW_LABEL: Record<TraceState, string> = {
  processing: 'Worked 4s · 1 tool',
  success: 'Worked 14s · 3 tools · 9 sources',
  failure: 'Failed after 2s · permission denied',
};

const PREVIEW_STATUS_LABEL: Record<TraceState, string> = {
  processing: 'In progress',
  success: 'Done · 14s',
  failure: 'Failed',
};

type SourcesDemoRow = {
  id: string;
  iconName: 'X' | 'Youtube' | 'Tiktok' | 'Pinterest';
  label: string;
  meta: string;
};

const SOURCES_DEMO_ROWS: ReadonlyArray<SourcesDemoRow> = [
  {
    id: 'vector-db',
    iconName: 'X',
    label: 'Searching knowledge base for relevant documents',
    meta: 'Vector DB',
  },
  {
    id: 'nlp-parser',
    iconName: 'Youtube',
    label: 'Extracting key entities and intent from user prompt',
    meta: 'NLP Parser',
  },
  {
    id: 'rest-api',
    iconName: 'Tiktok',
    label: 'Calling external API to retrieve live data',
    meta: 'REST API',
  },
  {
    id: 'llm-inference',
    iconName: 'Pinterest',
    label: 'Generating final response with tool call results',
    meta: 'LLM Inference',
  },
];

function ConfigurationDemo() {
  const [state, setState] = React.useState<TraceState>('processing');
  const [visibility, setVisibility] = React.useState<Visibility>('expanded');
  const [hasNested, setHasNested] = React.useState<boolean>(true);
  const isCollapsed = visibility === 'collapsed';
  const [tasksChecked, setTasksChecked] = React.useState<Record<string, boolean>>({
    t1: true,
    t2: true,
    t3: false,
    t4: false,
  });

  return (
    <ComponentConfigurationCard
      controls={
        <>
          <div style={{display: 'grid', gap: 8, minWidth: 0}}>
            <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
              Composition
            </Body>
            <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
              Processing Trace can host nested step cards or render as a single standalone card.
            </Body>
          </div>
          <ButtonGroup aria-label="Processing trace composition">
            <Button
              size="small"
              variant={hasNested ? 'secondary' : 'primary'}
              aria-pressed={!hasNested}
              onClick={() => setHasNested(false)}
            >
              Standalone
            </Button>
            <Button
              size="small"
              variant={hasNested ? 'primary' : 'secondary'}
              aria-pressed={hasNested}
              onClick={() => { setHasNested(true); setVisibility('expanded'); }}
            >
              Multi-card
            </Button>
          </ButtonGroup>
          <div style={{display: 'grid', gap: 8, minWidth: 0}}>
            <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
              State
            </Body>
            <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
              The status pill switches color and default label per state.
            </Body>
          </div>
          <ButtonGroup aria-label="Processing trace state">
            {STATE_OPTIONS.map((option) => (
              <Button
                key={option.value}
                size="small"
                variant={state === option.value ? 'primary' : 'secondary'}
                aria-pressed={state === option.value}
                onClick={() => setState(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </ButtonGroup>
          {hasNested ? (
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Visibility
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  When checked, the body region is hidden.
                </Body>
              </div>
              <Checkbox
                label="Is Collapsed"
                checked={isCollapsed}
                onChange={(e) =>
                  setVisibility(e.target.checked ? 'collapsed' : 'expanded')
                }
              />
            </>
          ) : null}
        </>
      }
      preview={
        hasNested ? (
        <ProcessingTrace
          state={state}
          label={PREVIEW_LABEL[state]}
          statusLabel={PREVIEW_STATUS_LABEL[state]}
          open={!isCollapsed}
          onOpenChange={(open) =>
            setVisibility(open ? 'expanded' : 'collapsed')
          }
        >
          <ProcessingTrace.Reasoning
            state={state}
            statusLabel={state === 'success' ? 'Done · 1.2s' : state === 'failure' ? 'Failed' : 'In progress'}
            defaultOpen={false}
            clamp={3}
            icon={<Icon name="Note" decorative />}
          >
            I&rsquo;m planning a multi-step research run. First I&rsquo;ll outline
            what we know, then collect sources, then synthesise. Once I have enough
            context I&rsquo;ll write a short summary and propose three next actions
            for the user to choose between. If the user accepts one I&rsquo;ll
            continue with the corresponding sub-plan.
          </ProcessingTrace.Reasoning>

          <ProcessingTrace.TaskPlan state={state} statusLabel={state === 'success' ? 'Done' : state === 'failure' ? 'Failed' : 'In progress'} defaultOpen={false} icon={<Icon name="List" decorative />}>
            <ProcessingTrace.Task
              label="Define research goal"
              checked={tasksChecked.t1}
              onChange={(c) => setTasksChecked((s) => ({...s, t1: c}))}
            />
            <ProcessingTrace.Task
              label="Collect 5+ primary sources"
              checked={tasksChecked.t2}
              onChange={(c) => setTasksChecked((s) => ({...s, t2: c}))}
            />
            <ProcessingTrace.Task
              label="Synthesise findings"
              checked={tasksChecked.t3}
              onChange={(c) => setTasksChecked((s) => ({...s, t3: c}))}
            />
            <ProcessingTrace.Task
              label="Draft summary"
              checked={tasksChecked.t4}
              onChange={(c) => setTasksChecked((s) => ({...s, t4: c}))}
            />
          </ProcessingTrace.TaskPlan>

          <ProcessingTrace.Sources
            state={state}
            statusLabel={state === 'success' ? 'Done · 2.4s' : state === 'failure' ? 'Failed' : 'In progress'}
            defaultOpen={false}
            label="Searched the web · 9 sources"
          >
            {SOURCES_DEMO_ROWS.map((row) => (
              <li
                key={row.id}
                className="ld-processingtrace-source ld-processingtracepage-sources-row"
              >
                <div className="ld-processingtracepage-sources-icon">
                  <Icon name={row.iconName} style={{fontSize: '16px'}} decorative />
                </div>
                <div className="ld-processingtracepage-sources-content">
                  <Body
                    as="span"
                    size="small"
                    UNSAFE_className="ld-processingtracepage-sources-label"
                  >
                    {row.label}
                  </Body>
                  <Caption
                    as="span"
                    color="subtlest"
                    isMonospace
                    UNSAFE_className="ld-processingtracepage-sources-meta"
                  >
                    {row.meta}
                  </Caption>
                </div>
              </li>
            ))}
          </ProcessingTrace.Sources>

          <ProcessingTrace.FileTool
            state={state}
            statusLabel={state === 'success' ? 'Done · 240ms' : state === 'failure' ? 'Failed' : 'In progress'}
            defaultOpen={false}
            maxHeight="160px"
            name="src/app/page.tsx"
            label="Code execution"
            icon={<Icon name="Code" decorative />}
          >
            {`import { Suspense } from 'react';
import { Skeleton } from '@/components/Skeleton';
import { Posts } from '@/components/Posts';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Home',
  description: 'Welcome to the app',
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Skeleton />}>
          <Posts />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}`}
          </ProcessingTrace.FileTool>
        </ProcessingTrace>
        ) : (
          <ProcessingTrace.ActivityList
            state={state}
            statusLabel={PREVIEW_STATUS_LABEL[state]}
            label={PREVIEW_LABEL[state]}
            collapsible={false}
          >
            <ProcessingTrace.ActivityItem
              state="success"
              label="Reading conversation history and context"
              icon={<Icon name="History" decorative style={{color: 'var(--ld-semantic-color-text-subtle)'}} />}
              trailing={<TraceTag state="success" label="Done" />}
            />
            <ProcessingTrace.ActivityItem
              state={state}
              label="Searching codebase for relevant files"
              icon={<Icon name="Search" decorative style={{color: 'var(--ld-semantic-color-text-subtle)'}} />}
              trailing={
                state === 'processing' ? (
                  <Spinner size="small" color="brand" variant="generic" />
                ) : state === 'success' ? (
                  <TraceTag state="success" label="Done" />
                ) : (
                  <TraceTag state="failure" label="Failed" />
                )
              }
            />
            <ProcessingTrace.ActivityItem
              state={state === 'failure' ? 'failure' : 'processing'}
              label="Analyzing component structure and hierarchy"
              icon={<Icon name="Note" decorative style={{color: 'var(--ld-semantic-color-text-subtle)'}} />}
            />
            <ProcessingTrace.ActivityItem
              state={state === 'failure' ? 'failure' : 'processing'}
              label="Generating design recommendations"
              icon={<Icon name="Magic" decorative style={{color: 'var(--ld-semantic-color-text-subtle)'}} />}
            />
            <ProcessingTrace.ActivityItem
              state={state === 'failure' ? 'failure' : 'processing'}
              label="Preparing final response"
              icon={<Icon name="CheckCircle" decorative style={{color: 'var(--ld-semantic-color-text-subtle)'}} />}
            />
          </ProcessingTrace.ActivityList>
        )
      }
    />
  );
}

/* ============================================================
   Demo 03 — Task list (standalone activity card)
   ============================================================ */

function TaskListDemo() {
  return (
    <ProcessingTrace.ActivityList
      label="Processing trace · 9 steps"
      collapsible={false}
      maxHeight="200px"
    >
      <ProcessingTrace.ActivityItem
        state="success"
        label="Reading conversation history and context"
        icon={<Icon name="History" decorative style={{color: 'var(--ld-semantic-color-text-subtle)'}} />}
        trailing={<TraceTag state="success" label="Done" />}
      />
      <ProcessingTrace.ActivityItem
        state="success"
        label="Resolved user intent and extracted parameters"
        icon={<Icon name="Search" decorative style={{color: 'var(--ld-semantic-color-text-subtle)'}} />}
        trailing={<TraceTag state="success" label="Done" />}
      />
      <ProcessingTrace.ActivityItem
        state="success"
        label="Fetched relevant documents from knowledge base"
        icon={<Icon name="Notebook" decorative style={{color: 'var(--ld-semantic-color-text-subtle)'}} />}
        trailing={<TraceTag state="success" label="Done" />}
      />
      <ProcessingTrace.ActivityItem
        state="processing"
        label="Searching codebase for relevant files"
        icon={<Icon name="Search" decorative style={{color: 'var(--ld-semantic-color-text-subtle)'}} />}
        trailing={<Spinner size="small" color="brand" variant="generic" />}
      />
      <ProcessingTrace.ActivityItem
        state="processing"
        label="Analyzing component structure and hierarchy"
        icon={<Icon name="Note" decorative style={{color: 'var(--ld-semantic-color-text-subtle)'}} />}
      />
      <ProcessingTrace.ActivityItem
        state="processing"
        label="Cross-referencing design tokens with usage"
        icon={<Icon name="Sliders" decorative style={{color: 'var(--ld-semantic-color-text-subtle)'}} />}
      />
      <ProcessingTrace.ActivityItem
        state="processing"
        label="Generating design recommendations"
        icon={<Icon name="Magic" decorative style={{color: 'var(--ld-semantic-color-text-subtle)'}} />}
      />
      <ProcessingTrace.ActivityItem
        state="processing"
        label="Formatting output for readability"
        icon={<Icon name="List" decorative style={{color: 'var(--ld-semantic-color-text-subtle)'}} />}
      />
      <ProcessingTrace.ActivityItem
        state="processing"
        label="Preparing final response"
        icon={<Icon name="CheckCircle" decorative style={{color: 'var(--ld-semantic-color-text-subtle)'}} />}
      />
    </ProcessingTrace.ActivityList>
  );
}

/* ============================================================
   Demo 04 — Process Timeline (standalone timeline card)
   ============================================================ */

function ProcessTimelineDemo() {
  return (
    <ProcessingTrace.Timeline
      label="Progress timeline"
      collapsible={false}
    >
      <ProcessingTrace.Step
        state="success"
        label="Searched the web"
        trailing={<TraceTag state="success" label="Completed" />}
      >
        Roma Norte art galleries cafes
      </ProcessingTrace.Step>
      <ProcessingTrace.Step
        state="success"
        label="Looked up Roma Norte highlights"
        trailing={<TraceTag state="success" label="Completed" />}
      >
        Pulled galleries, design shops, and standout taquerias clustered
        around Plaza Rio de Janeiro.
      </ProcessingTrace.Step>
      <ProcessingTrace.Step
        state="processing"
        label="Searching museums, bars, and cultural spots"
      >
        Currently checking opening hours and rooftop bar recommendations.
      </ProcessingTrace.Step>
    </ProcessingTrace.Timeline>
  );
}

/* ============================================================
   Demo 04 — Approval helper
   ============================================================ */

function ApprovalDemo() {
  return (
    <div
      style={{
        padding: 12,
        border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
        borderRadius: 8,
        background: 'var(--ld-semantic-color-surface, #ffffff)',
      }}
    >
      <ProcessingTrace.Approval
        title="Run the install command?"
        command="npm install typescript@5.5.4"
        menuItems={[
          {key: 'once', label: 'Allow once'},
          {key: 'always', label: 'Always allow'},
          {key: 'session', label: 'Allow for this session'},
        ]}
      />
    </div>
  );
}

/* ============================================================
   Demo 05 — Lanes helper
   ============================================================ */

function LanesDemo() {
  return (
    <ProcessingTrace
      state="processing"
      label="Researching 2 lanes"
      statusLabel="Researching"
      defaultOpen
    >
      <ProcessingTrace.Lanes>
        <ProcessingTrace.Lane
          state="success"
          statusLabel="Done"
          title="Lima itinerary"
          description="3-day food + history loop, central + Miraflores"
          progress={1}
        >
          12 venues evaluated · 6 final picks · 3 reservations suggested.
        </ProcessingTrace.Lane>
        <ProcessingTrace.Lane
          state="processing"
          statusLabel="50%"
          title="Cusco itinerary"
          description="4-day altitude-friendly schedule with day-trips"
          progress={0.5}
        >
          Currently comparing Sacred Valley tour operators…
        </ProcessingTrace.Lane>
      </ProcessingTrace.Lanes>
    </ProcessingTrace>
  );
}

/* ============================================================
   Page
   ============================================================ */

/**
 * Processing Trace gives the user a glanceable account of what an AI agent
 * did, is doing, or wants permission to do. The pattern is a stack of
 * `CardInteractive` cards: a top-level summary card that expands to reveal a
 * vertical column of typed step cards (reasoning, task plans, sources, tool
 * calls, timelines, activity feeds, approval gates, and research lanes).
 */
export default function ProcessingTracePage() {
  return (
    <PageWrapper
      title="Processing Trace"
      category="Patterns"
      description="A typed log of what an AI agent did or wants to do. Built from a custom accordion shell with eight optional subcomponents (Reasoning, TaskPlan, Sources, FileTool, Timeline, ActivityList, Approval, Lanes). Each card carries a status pill — `processing` is info-blue, `success` is positive-green, `failure` is negative-red."
    >
      <Section
        title="Component configuration"
        description="Processing Trace can render as a standalone card or as a container holding nested step cards. Toggle Composition to see both modes."
      >
        <ConfigurationDemo />
      </Section>

      <Section
        title="Task list"
        description="A flat list of agent actions with custom leading icons. Each row can show its own trailing status (a TraceTag pill, a Spinner, or nothing)."
      >
        <div style={{background: 'var(--ld-semantic-color-surface, #ffffff)', padding: 24, borderRadius: 8, boxShadow: 'var(--ld-semantic-elevation-200)'}}>
          <div style={{width: 600}}>
            <TaskListDemo />
          </div>
        </div>
      </Section>

      <Section
        title="Process Timeline"
        description="Containers may include multiple steps. The cards found within this section can also be used without a Processing Trace container."
      >
        <div style={{background: 'var(--ld-semantic-color-surface, #ffffff)', padding: 24, borderRadius: 8, boxShadow: 'var(--ld-semantic-elevation-200)'}}>
          <div style={{width: 600}}>
            <ProcessTimelineDemo />
          </div>
        </div>
      </Section>

      <Section
        title="Research lanes"
        description="Two concurrent investigations laid out side-by-side. Each lane has its own state, progress bar, and free-form body."
      >
        <div style={{background: 'var(--ld-semantic-color-surface, #ffffff)', padding: 24, borderRadius: 8, boxShadow: 'var(--ld-semantic-elevation-200)'}}>
          <div style={{width: 600}}>
            <LanesDemo />
          </div>
        </div>
      </Section>

      <Section
        title="Approval"
        description="A gated step that asks the user to allow a command. The Allow button has a split-button menu for granularity (once / always / this session)."
      >
        <div style={{background: 'var(--ld-semantic-color-surface, #ffffff)', padding: 24, borderRadius: 8, boxShadow: 'var(--ld-semantic-elevation-200)'}}>
          <div style={{width: 600}}>
            <ApprovalDemo />
          </div>
        </div>
      </Section>
    </PageWrapper>
  );
}
