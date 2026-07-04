import * as React from 'react';

import {Button} from '@/app/components/Button/Button';
import {Checkbox} from '@/app/components/Checkbox/Checkbox';
import {Panel} from '@/app/components/Panel/Panel';
import {cx} from '@/app/components/common/cx';

import '@/app/assets/walmart-assets/fonts/px/font.css';
import '@/app/components/DataTableConfigPanel/DataTableConfigPanel.css';
import type {DataTableColumnConfig} from '@/app/components/DataTableConfigPanel/DataTableConfigPanel';

import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

const INITIAL_COLUMNS: DataTableColumnConfig[] = [
  {id: 'campaign', label: 'Campaign', visible: true, pinned: true, alwaysVisible: true},
  {id: 'status', label: 'Status', visible: true, pinned: false},
  {id: 'budget', label: 'Budget', visible: true, pinned: false},
  {id: 'spend', label: 'Spend', visible: true, pinned: false},
  {id: 'impressions', label: 'Impressions', visible: true, pinned: false},
  {id: 'clicks', label: 'Clicks', visible: false, pinned: false},
  {id: 'ctr', label: 'CTR', visible: false, pinned: false},
  {id: 'cpc', label: 'CPC', visible: false, pinned: false},
  {id: 'actions', label: 'Actions', visible: true, pinned: true, alwaysPinned: true},
];

/** PX icon-font glyph, rendered directly so the PX pattern shows PX glyphs
 *  regardless of the active tenant theme. */
const PxIcon = ({name, size}: {name: string; size: 'small' | 'medium'}) => (
  <i
    className={`px px-${name}`}
    aria-hidden
    style={{fontSize: size === 'small' ? '1rem' : '1.5rem', lineHeight: 1}}
  />
);

/** Six-dot grip grabber. */
const DragHandleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M10.5 6C10.5 6.82843 9.82843 7.5 9 7.5C8.17157 7.5 7.5 6.82843 7.5 6C7.5 5.17157 8.17157 4.5 9 4.5C9.82843 4.5 10.5 5.17157 10.5 6Z" fill="currentColor" />
    <path d="M10.5 12C10.5 12.8284 9.82843 13.5 9 13.5C8.17157 13.5 7.5 12.8284 7.5 12C7.5 11.1716 8.17157 10.5 9 10.5C9.82843 10.5 10.5 11.1716 10.5 12Z" fill="currentColor" />
    <path d="M10.5 18C10.5 18.8284 9.82843 19.5 9 19.5C8.17157 19.5 7.5 18.8284 7.5 18C7.5 17.1716 8.17157 16.5 9 16.5C9.82843 16.5 10.5 17.1716 10.5 18Z" fill="currentColor" />
    <path d="M16.5 6C16.5 6.82843 15.8284 7.5 15 7.5C14.1716 7.5 13.5 6.82843 13.5 6C13.5 5.17157 14.1716 4.5 15 4.5C15.8284 4.5 16.5 5.17157 16.5 6Z" fill="currentColor" />
    <path d="M16.5 12C16.5 12.8284 15.8284 13.5 15 13.5C14.1716 13.5 13.5 12.8284 13.5 12C13.5 11.1716 14.1716 10.5 15 10.5C15.8284 10.5 16.5 11.1716 16.5 12Z" fill="currentColor" />
    <path d="M16.5 18C16.5 18.8284 15.8284 19.5 15 19.5C14.1716 19.5 13.5 18.8284 13.5 18C13.5 17.1716 14.1716 16.5 15 16.5C15.8284 16.5 16.5 17.1716 16.5 18Z" fill="currentColor" />
  </svg>
);

const PinIcon = () => <PxIcon name="Pin" size="small" />;

const PinFillIcon = () => <PxIcon name="PinFill" size="small" />;

interface DataTableConfigPanelHostProps {
  isOpen: boolean;
  onClose: () => void;
  columns: DataTableColumnConfig[];
  onApply: (columns: DataTableColumnConfig[]) => void;
}

/**
 * Mounts the column-config UI inside a right-side core/Panel. The Panel
 * provides the chrome (header, close button, scrim, slide-in animation),
 * and the Apply / Cancel buttons render in the Panel's footer slot.
 */
function DataTableConfigPanelHost({
  isOpen,
  onClose,
  columns,
  onApply,
}: DataTableConfigPanelHostProps) {
  const [localColumns, setLocalColumns] =
    React.useState<DataTableColumnConfig[]>(columns);
  const [dragIndex, setDragIndex] = React.useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = React.useState<number | null>(null);

  // ─── Keyboard drag state ────────────────────────────────────────────────────
  const [keyboardDragId, setKeyboardDragId] = React.useState<string | null>(null);
  const [preDragColumns, setPreDragColumns] = React.useState<DataTableColumnConfig[] | null>(null);

  // ─── "Move to" accessible menu state ───────────────────────────────────────
  const [moveMenuOpenId, setMoveMenuOpenId] = React.useState<string | null>(null);
  const [moveMenuPos, setMoveMenuPos] = React.useState<{top: number; left: number} | null>(null);

  // ─── In-dialog announcements ────────────────────────────────────────────────
  // Live regions must be INSIDE the Panel (aria-modal="true") — VoiceOver and
  // other strict SR implementations ignore external regions when a modal is open.
  // Zero-width prefix cycling ensures repeat messages always re-fire.
  const [dialogAssertive, setDialogAssertive] = React.useState('');
  const [dialogPolite, setDialogPolite] = React.useState('');
  const assertiveIdxRef = React.useRef(0);
  const politeIdxRef = React.useRef(0);
  const ZW = ['', '\u200B', '\u200C', '\u200B\u200B', '\u200B\u200C'];

  const announceAssertive = React.useCallback((msg: string) => {
    const prefix = ZW[assertiveIdxRef.current % ZW.length];
    assertiveIdxRef.current += 1;
    setDialogAssertive(prefix + msg);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const announcePolite = React.useCallback((msg: string) => {
    const prefix = ZW[politeIdxRef.current % ZW.length];
    politeIdxRef.current += 1;
    setDialogPolite(prefix + msg);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const labelIdPrefix = React.useId();
  const dndHintId = `${labelIdPrefix}-dnd-hint`;

  // Ref map: col.id → drag-handle <button> (used for re-focus, move menu positioning).
  const dragHandleRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());

  // Visually-hidden dismiss button inside the move menu (SR escape hatch).
  const moveDismissBtnRef = React.useRef<HTMLButtonElement>(null);

  // Track whether a mouse drag just occurred so click doesn't also open the menu.
  const didDragRef = React.useRef(false);

  React.useEffect(() => {
    if (isOpen) setLocalColumns(columns);
  }, [isOpen, columns]);

  // Close move menu when clicking outside it.
  React.useEffect(() => {
    if (!moveMenuOpenId) return;
    const onPointerDown = (e: PointerEvent) => {
      const menu = document.getElementById(`${labelIdPrefix}-move-menu`);
      const btn = dragHandleRefs.current.get(moveMenuOpenId);
      if (
        menu && !menu.contains(e.target as Node) &&
        btn && !btn.contains(e.target as Node)
      ) {
        setMoveMenuOpenId(null);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [moveMenuOpenId, labelIdPrefix]);

  const totalCount = localColumns.length;
  const visibleCount = localColumns.filter((c) => c.visible).length;

  // ─── Helpers ────────────────────────────────────────────────────────────────

  const refocusDragHandle = (id: string) => {
    requestAnimationFrame(() => {
      dragHandleRefs.current.get(id)?.focus();
    });
  };

  // ─── Field handlers ─────────────────────────────────────────────────────────

  const handleSelectAll = () =>
    setLocalColumns((cols) => cols.map((c) => ({...c, visible: true})));

  const handleClearSelected = () =>
    setLocalColumns((cols) =>
      cols.map((c) =>
        c.alwaysVisible || c.alwaysPinned
          ? c
          : {...c, visible: false, pinned: false},
      ),
    );

  const handleToggleVisible = (id: string) =>
    setLocalColumns((cols) =>
      cols.map((c) =>
        c.id === id
          ? {...c, visible: !c.visible, pinned: !c.visible ? c.pinned : false}
          : c,
      ),
    );

  const handleTogglePinned = (id: string) =>
    setLocalColumns((cols) =>
      cols.map((c) => (c.id === id ? {...c, pinned: !c.pinned} : c)),
    );

  // ─── Mouse drag ─────────────────────────────────────────────────────────────

  const handleDragStart = (index: number) => {
    didDragRef.current = true;
    setDragIndex(index);
  };
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };
  const handleDrop = (targetIndex: number) => {
    if (dragIndex === null || dragIndex === targetIndex) {
      setDragIndex(null);
      setDragOverIndex(null);
      return;
    }
    const next = [...localColumns];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(targetIndex, 0, moved);
    const alwaysVis = next.filter((c) => c.alwaysVisible);
    const alwaysPin = next.filter((c) => c.alwaysPinned);
    const rest = next.filter((c) => !c.alwaysVisible && !c.alwaysPinned);
    setLocalColumns([...alwaysVis, ...rest, ...alwaysPin]);
    setDragIndex(null);
    setDragOverIndex(null);
  };
  const handleDragEnd = () => {
    setDragIndex(null);
    setDragOverIndex(null);
    // Reset after a tick so the button's onClick (which fires after dragend) can check it.
    setTimeout(() => { didDragRef.current = false; }, 0);
  };

  // ─── "Move to" menu handlers ────────────────────────────────────────────────

  const handleOpenMoveMenu = (colId: string) => {
    const btn = dragHandleRefs.current.get(colId);
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    setMoveMenuPos({top: rect.bottom + 4, left: rect.left - 120});
    setMoveMenuOpenId(colId);
    requestAnimationFrame(() => {
      const menu = document.getElementById(`${labelIdPrefix}-move-menu`);
      (menu?.querySelector('[role="menuitem"]') as HTMLElement | null)?.focus();
    });
  };

  const handleMoveTo = (fromId: string, insertBeforeId: string | '__end__') => {
    const cols = localColumns;
    const total = cols.length;
    const fromIndex = cols.findIndex(c => c.id === fromId);
    if (fromIndex === -1) return;
    const next = [...cols];
    const [moved] = next.splice(fromIndex, 1);
    const toIndex =
      insertBeforeId === '__end__'
        ? next.length
        : next.findIndex(c => c.id === insertBeforeId);
    const insertAt = toIndex === -1 ? next.length : toIndex;
    next.splice(insertAt, 0, moved);
    const newPos = insertAt + 1; // 1-based position in the final array
    setLocalColumns(next);
    setMoveMenuOpenId(null);
    const col = cols.find(c => c.id === fromId);
    if (col) announcePolite(`${col.label} moved to position ${newPos} of ${total}.`);
    requestAnimationFrame(() => {
      dragHandleRefs.current.get(fromId)?.focus();
    });
  };

  const getMoveMenuItems = () => {
    const menu = document.getElementById(`${labelIdPrefix}-move-menu`);
    if (!menu) return [];
    return Array.from(menu.querySelectorAll<HTMLElement>('[role="menuitem"]'));
  };

  const handleMoveMenuKeyDown = (
    fromId: string,
    e: React.KeyboardEvent<HTMLElement>,
  ) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      // stopPropagation so the Panel's own Escape handler doesn't also fire.
      e.stopPropagation();
      setMoveMenuOpenId(null);
      requestAnimationFrame(() => dragHandleRefs.current.get(fromId)?.focus());
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const items = getMoveMenuItems();
      const current = document.activeElement as HTMLElement;
      const idx = items.indexOf(current);
      const next =
        e.key === 'ArrowDown'
          ? items[(idx + 1) % items.length]
          : items[(idx - 1 + items.length) % items.length];
      next?.focus();
      return;
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const items = getMoveMenuItems();
      const current = document.activeElement as HTMLElement;
      const idx = items.indexOf(current);
      if (!e.shiftKey) {
        // Tab from anywhere → visually-hidden dismiss button
        moveDismissBtnRef.current?.focus();
      } else {
        // Shift+Tab from first item → dismiss; from elsewhere → previous item
        if (idx <= 0) moveDismissBtnRef.current?.focus();
        else items[idx - 1]?.focus();
      }
    }
  };

  // ─── Drag handle click: open "Move to" menu (unless a drag just occurred) ───

  const handleDragHandleClick = (colId: string) => {
    // If we just finished a mouse drag, suppress the click — don't open menu.
    if (didDragRef.current) {
      didDragRef.current = false;
      return;
    }
    // Toggle: close if already open for this column, else open.
    if (moveMenuOpenId === colId) {
      setMoveMenuOpenId(null);
    } else {
      handleOpenMoveMenu(colId);
    }
  };

  // ─── Keyboard drag per-handle handler ───────────────────────────────────────

  const makeDragHandleKeyDown =
    (colId: string, colLabel: string) =>
    (e: React.KeyboardEvent) => {
      const isGrabbed = keyboardDragId === colId;

      if (e.key === ' ') {
        e.preventDefault();
        // Close move menu if open, then enter grab mode.
        setMoveMenuOpenId(null);
        if (keyboardDragId === null) {
          const pos = localColumns.findIndex(c => c.id === colId) + 1;
          setPreDragColumns([...localColumns]);
          setKeyboardDragId(colId);
          announceAssertive(
            `${pos} of ${localColumns.length} positioned. Arrow Up or Down to move, Enter to confirm, Escape to cancel.`,
          );
        } else if (isGrabbed) {
          const pos = localColumns.findIndex(c => c.id === colId) + 1;
          setPreDragColumns(null);
          setKeyboardDragId(null);
          announcePolite(`${colLabel} placed in position ${pos} of ${localColumns.length}.`);
        }
        return;
      }

      if (e.key === 'Enter' && isGrabbed) {
        e.preventDefault();
        const pos = localColumns.findIndex(c => c.id === colId) + 1;
        setPreDragColumns(null);
        setKeyboardDragId(null);
        announcePolite(`${colLabel} placed in position ${pos} of ${localColumns.length}.`);
        return;
      }

      if (e.key === 'Escape' && keyboardDragId !== null) {
        e.preventDefault();
        if (preDragColumns) setLocalColumns(preDragColumns);
        setPreDragColumns(null);
        setKeyboardDragId(null);
        announcePolite(`${colLabel} reorder cancelled.`);
        requestAnimationFrame(() => {
          dragHandleRefs.current.get(colId)?.focus();
        });
        return;
      }

      if (isGrabbed && e.key === 'ArrowUp') {
        e.preventDefault();
        const i = localColumns.findIndex(c => c.id === colId);
        if (i > 0 && !localColumns[i - 1]?.alwaysVisible) {
          const next = [...localColumns];
          [next[i - 1], next[i]] = [next[i], next[i - 1]];
          const newPos = i; // 1-indexed: moved from i to i-1, so new pos = i
          setLocalColumns(next);
          announceAssertive(`${colLabel} moved up, now position ${newPos} of ${localColumns.length}. Press Enter to confirm.`);
        }
        refocusDragHandle(colId);
        return;
      }

      if (isGrabbed && e.key === 'ArrowDown') {
        e.preventDefault();
        const i = localColumns.findIndex(c => c.id === colId);
        if (i < localColumns.length - 1 && !localColumns[i + 1]?.alwaysPinned) {
          const next = [...localColumns];
          [next[i], next[i + 1]] = [next[i + 1], next[i]];
          const newPos = i + 2; // 1-indexed: moved from i to i+1, so new pos = i+2
          setLocalColumns(next);
          announceAssertive(`${colLabel} moved down, now position ${newPos} of ${localColumns.length}. Press Enter to confirm.`);
        }
        refocusDragHandle(colId);
        return;
      }
    };

  // ─── Apply / Cancel ─────────────────────────────────────────────────────────

  const handleApply = () => {
    onApply(localColumns);
    onClose();
  };
  const handleCancel = () => {
    setLocalColumns(columns);
    onClose();
  };

  return (
    <Panel
      isOpen={isOpen}
      onClose={handleCancel}
      title="Customize Columns"
      position="right"
      size="small"
      actions={
        <>
          <Button variant="secondary" size="medium" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" size="medium" onClick={handleApply}>
            Apply
          </Button>
        </>
      }
    >
      {/* In-dialog live regions — inside aria-modal so VoiceOver reads them */}
      <div role="alert" aria-atomic="true" aria-live="assertive" className="px-data-table-config-panel__sr-only">
        {dialogAssertive}
      </div>
      <div role="status" aria-atomic="true" aria-live="polite" className="px-data-table-config-panel__sr-only">
        {dialogPolite}
      </div>

      <div className="px-data-table-config-panel__actions-row">
        <button
          type="button"
          className="px-data-table-config-panel__link-button"
          onClick={handleSelectAll}
        >
          Select all ({totalCount})
        </button>
        <button
          type="button"
          className="px-data-table-config-panel__link-button"
          onClick={handleClearSelected}
        >
          Clear selected ({visibleCount})
        </button>
      </div>

      {/* Hidden hint – announced to SR when drag handle receives focus */}
      <span id={dndHintId} className="px-data-table-config-panel__sr-only">
        Press Space to reorder, or click to open move menu
      </span>

      <div className="px-data-table-config-panel__column-list">
        {localColumns.map((col, index) => {
          const isDragging = dragIndex === index;
          const isDragOver = dragOverIndex === index && dragIndex !== index;
          const isGrabbedByKeyboard = keyboardDragId === col.id;
          const canDrag = !col.alwaysVisible && !col.alwaysPinned;
          const labelId = `${labelIdPrefix}-${col.id}`;
          const labelDisabled = !!(col.alwaysVisible || col.alwaysPinned);

          return (
            <div
              key={col.id}
              className={cx(
                'px-data-table-config-panel__column-row',
                isDragging &&
                  'px-data-table-config-panel__column-row--dragging',
                isDragOver &&
                  'px-data-table-config-panel__column-row--drag-over',
                isGrabbedByKeyboard &&
                  'px-data-table-config-panel__column-row--grabbed',
              )}
              draggable={canDrag}
              onDragStart={canDrag ? () => handleDragStart(index) : undefined}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={() => handleDrop(index)}
              onDragEnd={handleDragEnd}
            >
              <div className="px-data-table-config-panel__column-row-left">
                <Checkbox
                  checked={col.visible}
                  disabled={labelDisabled}
                  a11yLabelledBy={labelId}
                  onChange={() => {
                    if (!labelDisabled) handleToggleVisible(col.id);
                  }}
                />
                <span
                  id={labelId}
                  className={cx(
                    'px-data-table-config-panel__column-label',
                    labelDisabled &&
                      'px-data-table-config-panel__column-label--disabled',
                  )}
                >
                  {col.label}
                </span>
              </div>

              <div className="px-data-table-config-panel__column-row-right">
                {col.alwaysPinned ? (
                  <span
                    role="checkbox"
                    aria-checked="true"
                    aria-disabled="true"
                    aria-label={`Pin ${col.label}`}
                    className="px-data-table-config-panel__pin-button px-data-table-config-panel__pin-button--active"
                  >
                    <PinFillIcon />
                  </span>
                ) : col.visible ? (
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={col.pinned}
                    className={cx(
                      'px-data-table-config-panel__pin-button',
                      col.pinned &&
                        'px-data-table-config-panel__pin-button--active',
                    )}
                    onClick={() => handleTogglePinned(col.id)}
                    aria-label={`Pin ${col.label}`}
                    title={`Pin ${col.label} to left`}
                  >
                    {col.pinned ? <PinFillIcon /> : <PinIcon />}
                  </button>
                ) : (
                  <span className="px-data-table-config-panel__pin-button-spacer" />
                )}

                {canDrag ? (
                  <button
                    type="button"
                    ref={el => {
                      if (el) dragHandleRefs.current.set(col.id, el);
                      else dragHandleRefs.current.delete(col.id);
                    }}
                    className={cx(
                      'px-data-table-config-panel__drag-handle-btn',
                      isGrabbedByKeyboard &&
                        'px-data-table-config-panel__drag-handle-btn--grabbed',
                    )}
                    aria-label={`Reorder ${col.label}`}
                    aria-pressed={isGrabbedByKeyboard}
                    aria-haspopup="menu"
                    aria-expanded={moveMenuOpenId === col.id}
                    aria-describedby={isGrabbedByKeyboard ? undefined : dndHintId}
                    onClick={() => handleDragHandleClick(col.id)}
                    onKeyDown={makeDragHandleKeyDown(col.id, col.label)}
                  >
                    <DragHandleIcon />
                  </button>
                ) : (
                  <span
                    className="px-data-table-config-panel__drag-handle-btn px-data-table-config-panel__drag-handle-btn--hidden"
                    aria-hidden
                  >
                    <DragHandleIcon />
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* "Move to" menu — fixed-positioned so it escapes the Panel scroll container */}
      {moveMenuOpenId && moveMenuPos && (() => {
        const fromCol = localColumns.find(c => c.id === moveMenuOpenId);
        if (!fromCol) return null;
        const targets = localColumns.filter(
          c => c.id !== moveMenuOpenId && !c.alwaysVisible && !c.alwaysPinned,
        );
        return (
          <div
            id={`${labelIdPrefix}-move-menu`}
            role="menu"
            aria-label={`Move ${fromCol.label} to`}
            className="px-data-table-config-panel__move-menu"
            style={{position: 'fixed', top: moveMenuPos.top, left: moveMenuPos.left}}
            onKeyDown={e => handleMoveMenuKeyDown(moveMenuOpenId, e)}
          >
            {targets.map(t => (
              <button
                key={t.id}
                type="button"
                role="menuitem"
                className="px-data-table-config-panel__move-menu-item"
                onClick={() => handleMoveTo(moveMenuOpenId, t.id)}
              >
                Before {t.label}
              </button>
            ))}
            <button
              type="button"
              role="menuitem"
              className="px-data-table-config-panel__move-menu-item"
              onClick={() => handleMoveTo(moveMenuOpenId, '__end__')}
            >
              Move to end
            </button>
            {/* Visually-hidden dismiss button — SR escape hatch, mirrors DropdownMenuContent pattern */}
            <button
              ref={moveDismissBtnRef}
              type="button"
              aria-label="Dismiss"
              tabIndex={0}
              onClick={() => {
                const id = moveMenuOpenId;
                setMoveMenuOpenId(null);
                requestAnimationFrame(() => dragHandleRefs.current.get(id)?.focus());
              }}
              onKeyDown={(e) => {
                if (e.key === 'Tab') {
                  e.preventDefault();
                  const items = getMoveMenuItems();
                  // Shift+Tab from dismiss → last item; Tab → first item
                  if (e.shiftKey) items[items.length - 1]?.focus();
                  else items[0]?.focus();
                }
              }}
              style={{
                position: 'absolute', width: 1, height: 1, overflow: 'hidden',
                clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0,
                padding: 0, margin: 0,
              }}
            />
          </div>
        );
      })()}
    </Panel>
  );
}

export default function DataTableConfigPanelPage() {
  const [open, setOpen] = React.useState(false);
  const [columns, setColumns] = React.useState(INITIAL_COLUMNS);

  return (
    <PageWrapper
      title="Data Table Config Panel"
      category="PX Patterns"
      description="Customize core/DataTable columns — visibility, pin-to-left, drag-to-reorder. Mounted inside a right-side core/Panel so the chrome (header, close button, scrim, slide-in transition) comes from the Panel primitive."
    >
      <ExampleSection
        title="Component Configuration"
        description="Click to open the customize panel as a right-side core/Panel. Toggle visibility, pin columns, and drag rows to reorder. Apply commits the change; Cancel reverts."
      >
        <Button variant="primary" size="medium" onClick={() => setOpen(true)}>
          Customize columns
        </Button>
        <p style={{margin: '12px 0 0', color: '#74767C', fontSize: 14}}>
          Visible:{' '}
          {columns
            .filter((c) => c.visible)
            .map((c) => c.label)
            .join(', ')}
        </p>
        <DataTableConfigPanelHost
          isOpen={open}
          onClose={() => setOpen(false)}
          columns={columns}
          onApply={setColumns}
        />
      </ExampleSection>

      <GuidelinesSection
        description="Use Data Table Config Panel when users need to customize visible and pinned table columns. Keep always-visible and always-pinned columns locked, let cancel revert local changes, and apply column order only after the user confirms."
        defaultValue="panel position='right', size='small'"
      />
    </PageWrapper>
  );
}
