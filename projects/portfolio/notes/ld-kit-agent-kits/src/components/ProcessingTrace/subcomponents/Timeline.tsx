'use client';

import * as React from 'react';

import {cx} from '../../../common/cx';
import {
  CheckCircleIcon,
  ExclamationCircleFillIcon,
} from '../../Icons/Icons';
import {Spinner} from '../../Spinner/Spinner';
import {Body, Caption} from '../../Text/Text';

import {TraceRow} from '../TraceRow';
import type {TraceState} from '../ProcessingTrace';
import './Timeline.css';

/* ============================================================
   ProcessingTraceStep — single timeline step
   ============================================================ */

export interface ProcessingTraceStepProps {
  /** Step state — drives the spine glyph. */
  state: TraceState;
  /** Step label. */
  label: React.ReactNode;
  /** Optional secondary text (timestamp, duration, hint). */
  meta?: React.ReactNode;
  /** Optional body content (e.g. a snippet of what the step produced). */
  children?: React.ReactNode;
  /** Optional trailing slot aligned right of the label (e.g. a status pill). */
  trailing?: React.ReactNode;
  /** @internal Additional CSS class. */
  UNSAFE_className?: string;
}

const STATE_GLYPH: Record<TraceState, React.ReactNode> = {
  processing: <Spinner size="small" color="brand" variant="generic" />,
  success: <CheckCircleIcon />,
  failure: <ExclamationCircleFillIcon />,
};

export const ProcessingTraceStep: React.FunctionComponent<
  ProcessingTraceStepProps
> = (props) => {
  const {state, label, meta, children, trailing, UNSAFE_className} = props;

  return (
    <li
      className={cx(
        'ld-processingtrace-step',
        `ld-processingtrace-step--${state}`,
        UNSAFE_className,
      )}
    >
      <span className="ld-processingtrace-step-glyph" aria-hidden="true">
        {STATE_GLYPH[state]}
      </span>
      <span className="ld-processingtrace-step-content">
        <span className="ld-processingtrace-step-header">
          <Body size="medium" weight="alt">
            {label}
          </Body>
          {trailing != null ? (
            <span className="ld-processingtrace-step-trailing">{trailing}</span>
          ) : null}
        </span>
        {meta != null ? (
          <Caption color="subtle">{meta}</Caption>
        ) : null}
        {children != null ? (
          <div className="ld-processingtrace-step-children">{children}</div>
        ) : null}
      </span>
    </li>
  );
};

ProcessingTraceStep.displayName = 'ProcessingTrace.Step';

/* ============================================================
   ProcessingTraceTimeline — vertical timeline card
   ============================================================ */

export interface ProcessingTraceTimelineProps {
  /** Overall state. When omitted, no header status pill is rendered. */
  state?: TraceState;
  /** Override the status pill label. */
  statusLabel?: React.ReactNode;
  /** Header label. @default "Timeline" */
  label?: React.ReactNode;
  /** Optional leading icon. */
  icon?: React.ReactNode;
  /** One or more `<ProcessingTrace.Step>` children. */
  children: React.ReactNode;
  /** Uncontrolled initial open state. @default true */
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
  /** Callback fired when the card open state changes. */
  onOpenChange?: (open: boolean) => void;
  /**
   * When `false`, the card has no chevron and the body is always visible.
   * @default true
   */
  collapsible?: boolean;
  /** @internal Additional CSS class. */
  UNSAFE_className?: string;
}

/**
 * Vertical timeline card. Each child `<ProcessingTrace.Step>` renders its own
 * state glyph (Spinner / CheckCircle / ExclamationCircleFill) along a shared
 * vertical spine.
 */
export const ProcessingTraceTimeline: React.FunctionComponent<
  ProcessingTraceTimelineProps
> = (props) => {
  const {
    state,
    statusLabel,
    label = 'Timeline',
    icon,
    children,
    defaultOpen = true,
    open,
    onOpenChange,
    collapsible = true,
    UNSAFE_className,
  } = props;

  return (
    <TraceRow
      state={state}
      statusLabel={statusLabel}
      label={label}
      icon={icon}
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      collapsible={collapsible}
      UNSAFE_className={cx('ld-processingtrace-timeline', UNSAFE_className)}
    >
      <ol className="ld-processingtrace-timeline-list">{children}</ol>
    </TraceRow>
  );
};

ProcessingTraceTimeline.displayName = 'ProcessingTrace.Timeline';
