'use client';

import * as React from 'react';

import {cx} from '../common/cx';
import {ChevronRightIcon} from '../Icons/Icons';
import {Heading} from '../Text/Text';

import {TraceTag} from './TraceTag';
import {TraceRow} from './TraceRow';
import {ProcessingTraceReasoning} from './subcomponents/Reasoning';
import {
  ProcessingTraceTaskPlan,
  ProcessingTraceTask,
} from './subcomponents/TaskPlan';
import {
  ProcessingTraceSources,
  ProcessingTraceSource,
} from './subcomponents/Sources';
import {ProcessingTraceFileTool} from './subcomponents/FileTool';
import {
  ProcessingTraceTimeline,
  ProcessingTraceStep,
} from './subcomponents/Timeline';
import {
  ProcessingTraceActivityList,
  ProcessingTraceActivityItem,
} from './subcomponents/ActivityList';
import {ProcessingTraceApproval} from './subcomponents/Approval';
import {
  ProcessingTraceLanes,
  ProcessingTraceLane,
} from './subcomponents/Lanes';

import './ProcessingTrace.css';

/* ============================================================
   State vocabulary
   ============================================================ */

export type TraceState = 'processing' | 'success' | 'failure';

export const DEFAULT_STATE_LABELS: Record<TraceState, string> = {
  processing: 'Processing',
  success: 'Success',
  failure: 'Failure',
};

/* ============================================================
   ProcessingTrace — root container
   ============================================================ */

export interface ProcessingTraceProps {
  /** Overall state of the run. Drives the leading status pill. */
  state: TraceState;
  /**
   * Main header label — the human-readable summary of what happened
   * (e.g. "Worked for 14s · 3 tools · 9 sources").
   */
  label: React.ReactNode;
  /**
   * Override the auto-generated status text inside the pill
   * (e.g. "Worked 14s", "Researched 2m"). Falls back to the state name.
   */
  statusLabel?: React.ReactNode;
  /**
   * Body content — compose with `<ProcessingTrace.Row>` or any of the
   * registered subcomponents (Reasoning, TaskPlan, Sources, FileTool,
   * Timeline, ActivityList, Approval, Lanes).
   */
  children?: React.ReactNode;
  /** Uncontrolled initial open state. @default false */
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
  /** Callback fired when the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Optional accessible label for the toggle button. */
  a11yLabel?: string;
  /** @internal Additional CSS class. */
  UNSAFE_className?: string;
}

const ProcessingTraceRoot = React.forwardRef<HTMLDivElement, ProcessingTraceProps>(
  (props, ref) => {
    const {
      state,
      label,
      statusLabel,
      children,
      defaultOpen = false,
      open: controlledOpen,
      onOpenChange,
      a11yLabel,
      UNSAFE_className,
    } = props;

    const isControlled = controlledOpen !== undefined;
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
    const isOpen = isControlled ? (controlledOpen as boolean) : uncontrolledOpen;
    const bodyId = React.useId();

    function handleToggle() {
      if (isControlled) {
        onOpenChange?.(!isOpen);
      } else {
        setUncontrolledOpen((prev) => {
          const next = !prev;
          onOpenChange?.(next);
          return next;
        });
      }
    }

    return (
      <div
        ref={ref}
        className={cx(
          'ld-processingtrace',
          isOpen && 'ld-processingtrace--open',
          UNSAFE_className,
        )}
      >
        <button
          type="button"
          className="ld-processingtrace-header"
          aria-expanded={isOpen}
          aria-controls={bodyId}
          aria-label={a11yLabel}
          onClick={handleToggle}
        >
          <span className="ld-processingtrace-header-stack">
            <TraceTag state={state} label={statusLabel} />
            <Heading
              as="span"
              size="small"
              UNSAFE_className="ld-processingtrace-header-title"
            >
              {label}
            </Heading>
          </span>
          <ChevronRightIcon
            className="ld-processingtrace-chevron"
            aria-hidden="true"
          />
        </button>
        {isOpen ? (
          <div id={bodyId} className="ld-processingtrace-body">
            {children}
          </div>
        ) : null}
      </div>
    );
  },
);

ProcessingTraceRoot.displayName = 'ProcessingTrace';

/* ============================================================
   Composed export
   ============================================================ */

export const ProcessingTrace = Object.assign(ProcessingTraceRoot, {
  /** Generic outlined-card step used by every subcomponent. */
  Row: TraceRow,
  /** Reasoning card — collapsible thought block with optional "Show more". */
  Reasoning: ProcessingTraceReasoning,
  /** Task plan card — auto-numbers steps and renders LD `Checkbox` children. */
  TaskPlan: ProcessingTraceTaskPlan,
  /** Individual task inside a `TaskPlan`. */
  Task: ProcessingTraceTask,
  /** Sources card — search results list with optional query header. */
  Sources: ProcessingTraceSources,
  /** Individual source row inside a `Sources` card. */
  Source: ProcessingTraceSource,
  /** Tool call card — monospace tool name with code/text body. */
  FileTool: ProcessingTraceFileTool,
  /** Timeline card — vertical spine + state-icon steps. */
  Timeline: ProcessingTraceTimeline,
  /** Individual step inside a `Timeline`. */
  Step: ProcessingTraceStep,
  /** Activity list card — basic ordered task list. */
  ActivityList: ProcessingTraceActivityList,
  /** Individual activity inside an `ActivityList`. */
  ActivityItem: ProcessingTraceActivityItem,
  /** Approval card — Allow / Skip with a split-button menu. */
  Approval: ProcessingTraceApproval,
  /** Research lanes card — 2-col grid with per-lane progress. */
  Lanes: ProcessingTraceLanes,
  /** Individual lane inside a `Lanes` card. */
  Lane: ProcessingTraceLane,
});

/* Re-export sibling primitives for direct consumer use. */
export {TraceTag, type TraceTagProps} from './TraceTag';
export {TraceRow, type TraceRowProps} from './TraceRow';
