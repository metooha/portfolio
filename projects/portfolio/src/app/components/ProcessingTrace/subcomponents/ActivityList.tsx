'use client';

import * as React from 'react';

import {cx} from '../../common/cx';
import {
  CheckCircleIcon,
  ExclamationCircleFillIcon,
} from '../../Icons/Icons';
import {Spinner} from '../../Spinner/Spinner';
import {Body, Caption} from '../../Text/Text';

import {TraceRow} from '../TraceRow';
import type {TraceState} from '../ProcessingTrace';
import './ActivityList.css';

/* ============================================================
   ProcessingTraceActivityItem — single activity row
   ============================================================ */

export interface ProcessingTraceActivityItemProps {
  /** Activity state — drives the leading glyph. */
  state: TraceState;
  /** Activity label. */
  label: React.ReactNode;
  /** Optional secondary text (timestamp, target, hint). */
  meta?: React.ReactNode;
  /**
   * Optional custom leading icon. When provided, it replaces the default
   * state glyph (the row's `state` still drives the icon color).
   */
  icon?: React.ReactNode;
  /** Optional trailing slot rendered on the right edge of the row. */
  trailing?: React.ReactNode;
  /** @internal Additional CSS class. */
  UNSAFE_className?: string;
}

const STATE_GLYPH: Record<TraceState, React.ReactNode> = {
  processing: <Spinner size="small" color="brand" variant="generic" />,
  success: <CheckCircleIcon />,
  failure: <ExclamationCircleFillIcon />,
};

export const ProcessingTraceActivityItem: React.FunctionComponent<
  ProcessingTraceActivityItemProps
> = (props) => {
  const {state, label, meta, icon, trailing, UNSAFE_className} = props;

  return (
    <li
      className={cx(
        'ld-processingtrace-activity',
        `ld-processingtrace-activity--${state}`,
        UNSAFE_className,
      )}
    >
      <span className="ld-processingtrace-activity-glyph" aria-hidden="true">
        {icon ?? STATE_GLYPH[state]}
      </span>
      <span className="ld-processingtrace-activity-text">
        <Body size="small">{label}</Body>
        {meta != null ? (
          <Caption color="subtle">{meta}</Caption>
        ) : null}
      </span>
      {trailing != null ? (
        <span className="ld-processingtrace-activity-trailing">{trailing}</span>
      ) : null}
    </li>
  );
};

ProcessingTraceActivityItem.displayName = 'ProcessingTrace.ActivityItem';

/* ============================================================
   ProcessingTraceActivityList — compact activity log card
   ============================================================ */

export interface ProcessingTraceActivityListProps {
  /** Overall state. When omitted, no header status pill is rendered. */
  state?: TraceState;
  /** Override the status pill label. */
  statusLabel?: React.ReactNode;
  /** Header label. @default "Activity" */
  label?: React.ReactNode;
  /** Optional leading icon. */
  icon?: React.ReactNode;
  /** One or more `<ProcessingTrace.ActivityItem>` children. */
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
  /**
   * Optional max-height for the scrollable list body (e.g. `"200px"`). When
   * set, the list overflows with a scrollbar when content exceeds the height.
   */
  maxHeight?: string;
  /** @internal Additional CSS class. */
  UNSAFE_className?: string;
}

/**
 * Activity list card. A simpler sibling of `Timeline` — no spine, no nested
 * body content, just a tight `[glyph] [text]` grid.
 */
export const ProcessingTraceActivityList: React.FunctionComponent<
  ProcessingTraceActivityListProps
> = (props) => {
  const {
    state,
    statusLabel,
    label = 'Activity',
    icon,
    children,
    defaultOpen = true,
    open,
    onOpenChange,
    collapsible = true,
    maxHeight,
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
      UNSAFE_className={cx('ld-processingtrace-activitylist', UNSAFE_className)}
    >
      <ul
        className="ld-processingtrace-activitylist-list"
        style={maxHeight ? {maxHeight, overflowY: 'auto', overflowX: 'hidden'} : undefined}
      >
        {children}
      </ul>
    </TraceRow>
  );
};

ProcessingTraceActivityList.displayName = 'ProcessingTrace.ActivityList';
