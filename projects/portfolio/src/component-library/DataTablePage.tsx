import * as React from 'react';

import {Button} from '@/app/components/Button/Button';
import {cx} from '@/app/components/common/cx';
import {
  DataTable,
  DataTableBody,
  DataTableBulkActions,
  DataTableCell,
  DataTableCellBulkEditTextArea,
  DataTableCellInlineEditTextArea,
  DataTableCellSelect,
  DataTableCellStatus,
  DataTableHead,
  DataTableHeader,
  DataTableHeaderSelect,
  DataTableRow,
} from '@/app/components/DataTable/DataTable';
import {
  DataTableConfigPanel,
  type DataTableColumnConfig,
} from '@/app/components/DataTableConfigPanel/DataTableConfigPanel';
import {DataTableTitle} from '@/app/components/DataTableTitle';
import {DateField} from '@/app/components/DateField/DateField';
import {
  SelectDropdown,
  SelectDropdownContent,
  SelectDropdownItem,
  SelectDropdownSeparator,
  SelectDropdownTrigger,
} from '@/app/components/SelectDropdown/SelectDropdown';
import {Tag} from '@/app/components/Tag/Tag';
import {Body} from '@/app/components/Text/Text';
import {
  DocsCard,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

type TablePattern = 'basic' | 'configurable' | 'selectable' | 'sortable' | 'inlineEdit' | 'bulkEdit' | 'dateFilter';

const PATTERNS: Array<{value: TablePattern; label: string; description: string}> = [
  {value: 'basic', label: 'Basic', description: 'Headers, numeric cells, and status labels.'},
  {value: 'configurable', label: 'Configurable', description: 'Resizable, sortable columns with order and pin controls.'},
  {value: 'selectable', label: 'Selectable', description: 'Row selection with bulk actions.'},
  {value: 'sortable', label: 'Sortable', description: 'Sortable quantity column with active sort state.'},
  {value: 'inlineEdit', label: 'Inline edit', description: 'Editable cells that open a focused edit surface.'},
  {value: 'bulkEdit', label: 'Bulk edit', description: 'Bulk-edit cells with edited and error states.'},
  {value: 'dateFilter', label: 'Date filter', description: 'A title action area with a date field filter.'},
];

const sampleRows = [
  {id: '100234', item: 'Portable Keyboard', department: 'Electronics', inventory: 42, dueDate: '05/12/2026', status: 'In Stock'},
  {id: '100235', item: 'USB-C Hub', department: 'Electronics', inventory: 8, dueDate: '05/13/2026', status: 'Low Stock'},
  {id: '100236', item: 'Wireless Mouse', department: 'Workspace', inventory: 0, dueDate: '05/14/2026', status: 'Out of Stock'},
];

const replenishmentRows = [
  {id: 'milk', item: 'Milk 2%', department: 'Dairy', dueDate: '05/12/2026', quantity: 24, status: 'Ready'},
  {id: 'berries', item: 'Strawberries', department: 'Produce', dueDate: '05/13/2026', quantity: 12, status: 'Needs Review'},
  {id: 'paper', item: 'Paper Towels', department: 'Household', dueDate: '05/14/2026', quantity: 36, status: 'Ready'},
];

type ConfigurableColumnId = 'id' | 'item' | 'department' | 'inventory' | 'dueDate' | 'status' | 'actions';
type SortDirection = 'ascending' | 'descending';
type ResizeDragState = {columnId: ConfigurableColumnId; startX: number; startWidth: number} | null;

interface ConfigurableColumn extends DataTableColumnConfig {
  id: ConfigurableColumnId;
  alignment?: 'left' | 'right';
  initialWidth: number;
  lockedPosition?: 'first' | 'last';
  minWidth: number;
  sortable?: boolean;
}

const CONFIGURABLE_COLUMNS: ConfigurableColumn[] = [
  {id: 'id', label: 'ID', visible: true, pinned: true, alwaysVisible: true, lockedPosition: 'first', initialWidth: 140, minWidth: 112, sortable: true},
  {id: 'item', label: 'Item', visible: true, pinned: false, initialWidth: 220, minWidth: 160, sortable: true},
  {id: 'department', label: 'Department', visible: true, pinned: false, initialWidth: 180, minWidth: 140, sortable: true},
  {id: 'inventory', label: 'Inventory', visible: true, pinned: false, alignment: 'right', initialWidth: 160, minWidth: 132, sortable: true},
  {id: 'dueDate', label: 'Due date', visible: true, pinned: false, initialWidth: 170, minWidth: 140, sortable: true},
  {id: 'status', label: 'Status', visible: true, pinned: false, initialWidth: 170, minWidth: 140, sortable: true},
  {id: 'actions', label: 'More actions', visible: true, pinned: true, alwaysPinned: true, lockedPosition: 'last', alignment: 'right', initialWidth: 150, minWidth: 132},
];

const TABLE_FRAME: React.CSSProperties = {
  border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
  borderRadius: 8,
  background: 'var(--ld-semantic-color-surface, #ffffff)',
  width: '100%',
  maxWidth: 'none',
  overflow: 'visible',
};

const TABLE_VIEWPORT: React.CSSProperties = {
  overflowX: 'auto',
  overflowY: 'visible',
  width: '100%',
};

const TABLE_CONTENT: React.CSSProperties = {
  minWidth: 640,
  width: '100%',
};

const CONFIGURATION_STACK: React.CSSProperties = {
  display: 'grid',
  gap: 24,
  minWidth: 0,
};

const PATTERN_SELECTOR: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 16,
  minWidth: 0,
};

const PATTERN_STACK: React.CSSProperties = {
  display: 'grid',
  gap: 24,
  minWidth: 0,
};

const CONFIGURABLE_TABLE_CSS = `
.ld-docs-configurable-table {
  table-layout: fixed;
  min-width: 1110px;
  width: 100%;
}

.ld-docs-configurable-table th,
.ld-docs-configurable-table td {
  box-sizing: border-box;
}

.ld-docs-configurable-table__header {
  background: var(--ld-semantic-color-surface-subtle, #f8f8f8);
  border-bottom: 1px solid var(--ld-semantic-color-separator, #e3e4e5);
  color: var(--ld-semantic-color-text, #2e2f32);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5rem;
  padding: 0;
  position: relative;
  text-align: left;
  vertical-align: middle;
}

.ld-docs-configurable-table__cell {
  background: var(--ld-semantic-color-surface, #ffffff);
  border-bottom: 1px solid var(--ld-semantic-color-separator, #e3e4e5);
  color: var(--ld-semantic-color-text, #2e2f32);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  padding: 1rem;
  vertical-align: middle;
}

.ld-docs-configurable-table__cell--numeric {
  font-family: EverydaySansMono, 'Courier New', monospace;
  text-align: right;
}

.ld-docs-configurable-table__cell--right {
  text-align: right;
}

.ld-docs-configurable-table__headerInner {
  align-items: center;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  min-width: 0;
  padding: 0.75rem 0.75rem 0.75rem 1rem;
}

.ld-docs-configurable-table__sortButton {
  flex: 1 1 auto;
  justify-content: flex-start;
  min-width: 0;
  padding-inline: 8px;
}

.ld-docs-configurable-table__headerLabel {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ld-docs-configurable-table__resizeHandle {
  align-items: center;
  align-self: stretch;
  background: transparent;
  border: 0;
  color: var(--ld-semantic-color-text-subtle, #74767c);
  cursor: col-resize;
  display: inline-flex;
  justify-content: center;
  min-height: 32px;
  padding: 0;
  touch-action: none;
  width: 16px;
}

.ld-docs-configurable-table__resizeHandle::before {
  background: var(--ld-semantic-color-separator, #e3e4e5);
  content: '';
  display: block;
  height: 100%;
  width: 2px;
}

.ld-docs-configurable-table__resizeHandle:hover::before,
.ld-docs-configurable-table__resizeHandle:focus-visible::before {
  background: var(--ld-semantic-color-action-fill-primary, #0053e2);
}

.ld-docs-configurable-table__pinned {
  box-shadow: 1px 0 0 var(--ld-semantic-color-separator, #e3e4e5);
  left: 0;
  position: sticky;
  z-index: 2;
}

.ld-docs-configurable-table__header.ld-docs-configurable-table__pinned {
  z-index: 3;
}

.ld-docs-configurable-table__menuWrap {
  display: flex;
  justify-content: flex-end;
}
`;

function PatternSelector({pattern, onPatternChange}: {pattern: TablePattern; onPatternChange: (pattern: TablePattern) => void}) {
  return (
    <div role="group" aria-label="Data table pattern" style={PATTERN_SELECTOR}>
      {PATTERNS.map((item) => (
        <Button
          key={item.value}
          size="small"
          variant={pattern === item.value ? 'primary' : 'secondary'}
          aria-pressed={pattern === item.value}
          onClick={() => onPatternChange(item.value)}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
}

function TableViewport({children, reserveEditSpace = false}: {children: React.ReactNode; reserveEditSpace?: boolean}) {
  return (
    <div style={{...TABLE_VIEWPORT, paddingBottom: reserveEditSpace ? 104 : 0}} tabIndex={0}>
      <div style={TABLE_CONTENT}>{children}</div>
    </div>
  );
}

function normalizeConfigurableColumns(columns: ConfigurableColumn[]) {
  const firstColumn = columns.find((column) => column.lockedPosition === 'first');
  const lastColumn = columns.find((column) => column.lockedPosition === 'last');
  const middleColumns = columns.filter((column) => !column.lockedPosition);

  return [firstColumn, ...middleColumns, lastColumn].filter(Boolean) as ConfigurableColumn[];
}

function getColumnValue(row: (typeof sampleRows)[number], columnId: ConfigurableColumnId) {
  if (columnId === 'actions') return '';
  return row[columnId];
}

function compareValues(a: string | number, b: string | number) {
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b), undefined, {numeric: true, sensitivity: 'base'});
}

function SortIndicator({active, direction}: {active: boolean; direction: SortDirection}) {
  if (!active) return <span aria-hidden="true">Sort</span>;
  return <span aria-hidden="true">{direction === 'ascending' ? 'Asc' : 'Desc'}</span>;
}

function SortableResizableHeader({
  column,
  isPinned,
  sort,
  width,
  onResizeStart,
  onSort,
}: {
  column: ConfigurableColumn;
  isPinned: boolean;
  sort: {id: ConfigurableColumnId; direction: SortDirection};
  width: number;
  onResizeStart: (columnId: ConfigurableColumnId, startX: number, startWidth: number) => void;
  onSort: (columnId: ConfigurableColumnId) => void;
}) {
  const isSorted = sort.id === column.id;

  return (
    <th
      aria-sort={column.sortable && isSorted ? sort.direction : undefined}
      className={cx(
        'ld-docs-configurable-table__header',
        isPinned && 'ld-docs-configurable-table__pinned',
      )}
      scope="col"
      style={{width, minWidth: column.minWidth}}
    >
      <div className="ld-docs-configurable-table__headerInner">
        {column.sortable ? (
          <Button
            type="button"
            variant="ghost"
            size="small"
            UNSAFE_className="ld-docs-configurable-table__sortButton"
            onClick={() => onSort(column.id)}
            aria-label={`Sort by ${column.label}`}
          >
            <span className="ld-docs-configurable-table__headerLabel">{column.label}</span>
            <SortIndicator active={isSorted} direction={sort.direction} />
          </Button>
        ) : (
          <span className="ld-docs-configurable-table__headerLabel">{column.label}</span>
        )}
        <button
          type="button"
          className="ld-docs-configurable-table__resizeHandle"
          aria-label={`Drag to resize ${column.label} column`}
          onPointerDown={(event) => {
            event.preventDefault();
            onResizeStart(column.id, event.clientX, width);
          }}
        />
      </div>
    </th>
  );
}

function RowActionsMenu({item}: {item: string}) {
  return (
    <div className="ld-docs-configurable-table__menuWrap">
      <SelectDropdown>
        <SelectDropdownTrigger asChild>
          <Button size="small" variant="tertiary">More</Button>
        </SelectDropdownTrigger>
        <SelectDropdownContent align="end">
          <SelectDropdownItem>View details</SelectDropdownItem>
          <SelectDropdownItem>Edit {item}</SelectDropdownItem>
          <SelectDropdownSeparator />
          <SelectDropdownItem>Create replenishment task</SelectDropdownItem>
        </SelectDropdownContent>
      </SelectDropdown>
    </div>
  );
}

function statusColor(status: string) {
  if (status === 'In Stock' || status === 'Ready') return 'green' as const;
  if (status === 'Low Stock' || status === 'Needs Review') return 'yellow' as const;
  if (status === 'Edited') return 'purple' as const;
  return 'red' as const;
}

function ConfigurableTableCell({
  column,
  isPinned,
  row,
}: {
  column: ConfigurableColumn;
  isPinned: boolean;
  row: (typeof sampleRows)[number];
}) {
  if (column.id === 'actions') {
    return (
      <td className="ld-docs-configurable-table__cell ld-docs-configurable-table__cell--right">
        <RowActionsMenu item={row.item} />
      </td>
    );
  }

  if (column.id === 'status') {
    return (
      <td className="ld-docs-configurable-table__cell">
        <Tag color={statusColor(row.status)} variant="tertiary">{row.status}</Tag>
      </td>
    );
  }

  const isNumeric = column.id === 'inventory';

  return (
    <td
      className={cx(
        'ld-docs-configurable-table__cell',
        isNumeric && 'ld-docs-configurable-table__cell--numeric',
        column.alignment === 'right' && 'ld-docs-configurable-table__cell--right',
        isPinned && 'ld-docs-configurable-table__pinned',
      )}
    >
      {getColumnValue(row, column.id)}
    </td>
  );
}

function ConfigurableTable() {
  const [columns, setColumns] = React.useState<ConfigurableColumn[]>(CONFIGURABLE_COLUMNS);
  const [sort, setSort] = React.useState<{id: ConfigurableColumnId; direction: SortDirection}>({id: 'inventory', direction: 'descending'});
  const [widths, setWidths] = React.useState<Record<ConfigurableColumnId, number>>(() => (
    CONFIGURABLE_COLUMNS.reduce((accumulator, column) => ({...accumulator, [column.id]: column.initialWidth}), {} as Record<ConfigurableColumnId, number>)
  ));
  const [panelOpen, setPanelOpen] = React.useState(false);
  const [resizeDrag, setResizeDrag] = React.useState<ResizeDragState>(null);

  const visibleColumns = React.useMemo(() => normalizeConfigurableColumns(columns).filter((column) => column.visible), [columns]);
  const sortedRows = React.useMemo(() => {
    return [...sampleRows].sort((a, b) => {
      const comparison = compareValues(getColumnValue(a, sort.id), getColumnValue(b, sort.id));
      return sort.direction === 'ascending' ? comparison : -comparison;
    });
  }, [sort]);
  const pinnedFirstColumn = visibleColumns[0]?.lockedPosition === 'first' && visibleColumns[0].pinned;

  const handleSort = (columnId: ConfigurableColumnId) => {
    setSort((current) => (
      current.id === columnId
        ? {...current, direction: current.direction === 'ascending' ? 'descending' : 'ascending'}
        : {id: columnId, direction: 'ascending'}
    ));
  };

  React.useEffect(() => {
    if (!resizeDrag) return;

    const column = CONFIGURABLE_COLUMNS.find((item) => item.id === resizeDrag.columnId);
    const minWidth = column?.minWidth ?? 112;

    const handlePointerMove = (event: PointerEvent) => {
      const nextWidth = Math.max(minWidth, resizeDrag.startWidth + event.clientX - resizeDrag.startX);
      setWidths((current) => ({...current, [resizeDrag.columnId]: nextWidth}));
    };

    const handlePointerUp = () => setResizeDrag(null);

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp, {once: true});
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [resizeDrag]);

  return (
    <div style={TABLE_FRAME}>
      <style>{CONFIGURABLE_TABLE_CSS}</style>
      <DataTableTitle
        subtitle="Resize columns, sort headers, and use the configuration panel to reorder middle columns or freeze ID."
        actions={
          <Button size="small" variant="secondary" onClick={() => setPanelOpen(true)}>
            Configure columns
          </Button>
        }
      >
        Configurable inventory
      </DataTableTitle>
      <TableViewport>
        <DataTable aria-label="Configurable inventory table" UNSAFE_className="ld-docs-configurable-table">
          <colgroup>
            {visibleColumns.map((column) => (
              <col key={column.id} style={{width: widths[column.id], minWidth: column.minWidth}} />
            ))}
          </colgroup>
          <thead>
            <tr>
              {visibleColumns.map((column, index) => (
                <SortableResizableHeader
                  key={column.id}
                  column={column}
                  isPinned={pinnedFirstColumn && index === 0}
                  onResizeStart={(columnId, startX, startWidth) => setResizeDrag({columnId, startX, startWidth})}
                  onSort={handleSort}
                  sort={sort}
                  width={widths[column.id]}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row) => (
              <tr key={row.id}>
                {visibleColumns.map((column, index) => (
                  <ConfigurableTableCell
                    key={column.id}
                    column={column}
                    isPinned={pinnedFirstColumn && index === 0}
                    row={row}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </DataTable>
      </TableViewport>
      <DataTableConfigPanel
        columns={columns}
        isOpen={panelOpen}
        onApply={(nextColumns: DataTableColumnConfig[]) => setColumns(normalizeConfigurableColumns(nextColumns as ConfigurableColumn[]))}
        onClose={() => setPanelOpen(false)}
        title="Configure table"
      />
    </div>
  );
}

function BasicTable() {
  return (
    <div style={TABLE_FRAME}>
      <DataTableTitle
        subtitle="Showing 3 inventory items"
        actions={
          <>
            <Button size="small" variant="secondary">Filter</Button>
            <Button size="small" variant="primary">New item</Button>
          </>
        }
      >
        Inventory items
      </DataTableTitle>
      <TableViewport>
        <DataTable>
          <DataTableHead>
            <DataTableRow>
              <DataTableHeader>ID</DataTableHeader>
              <DataTableHeader>Item</DataTableHeader>
              <DataTableHeader alignment="right">Inventory</DataTableHeader>
              <DataTableHeader>Status</DataTableHeader>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {sampleRows.map((row) => (
              <DataTableRow key={row.id}>
                <DataTableCell>{row.id}</DataTableCell>
                <DataTableCell>{row.item}</DataTableCell>
                <DataTableCell variant="numeric">{row.inventory}</DataTableCell>
                <DataTableCellStatus>
                  <Tag color={statusColor(row.status)} variant="tertiary">{row.status}</Tag>
                </DataTableCellStatus>
              </DataTableRow>
            ))}
          </DataTableBody>
        </DataTable>
      </TableViewport>
    </div>
  );
}

function SelectableRowsTable() {
  const [selectedIds, setSelectedIds] = React.useState<string[]>(['milk']);
  const selectedSet = React.useMemo(() => new Set(selectedIds), [selectedIds]);
  const allSelected = selectedIds.length === replenishmentRows.length;
  const isIndeterminate = selectedIds.length > 0 && !allSelected;

  const toggleAll = (checked: boolean) => {
    setSelectedIds(checked ? replenishmentRows.map((row) => row.id) : []);
  };

  const toggleRow = (id: string, checked: boolean) => {
    setSelectedIds((current) => (
      checked ? [...new Set([...current, id])] : current.filter((selectedId) => selectedId !== id)
    ));
  };

  return (
    <div style={TABLE_FRAME}>
      {selectedIds.length > 0 ? (
        <DataTableBulkActions
          count={selectedIds.length}
          onClearSelected={() => setSelectedIds([])}
          onSelectAll={() => toggleAll(true)}
          actionContent={
            <>
              <Button size="small" variant="secondary">Assign</Button>
              <Button size="small" variant="primary">Export</Button>
            </>
          }
        />
      ) : null}
      <TableViewport>
        <DataTable>
          <DataTableHead>
            <DataTableRow>
              <DataTableHeaderSelect
                checked={allSelected}
                indeterminate={isIndeterminate}
                onChange={(event) => toggleAll(event.target.checked)}
              />
              <DataTableHeader>Item</DataTableHeader>
              <DataTableHeader>Department</DataTableHeader>
              <DataTableHeader alignment="right">Qty</DataTableHeader>
              <DataTableHeader>Status</DataTableHeader>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {replenishmentRows.map((row) => {
              const selected = selectedSet.has(row.id);
              const labelId = `selectable-row-${row.id}`;
              return (
                <DataTableRow key={row.id} selected={selected}>
                  <DataTableCellSelect
                    a11yLabelledBy={labelId}
                    checked={selected}
                    onChange={(event) => toggleRow(row.id, event.target.checked)}
                  />
                  <DataTableCell id={labelId}>{row.item}</DataTableCell>
                  <DataTableCell>{row.department}</DataTableCell>
                  <DataTableCell variant="numeric">{row.quantity}</DataTableCell>
                  <DataTableCellStatus>
                    <Tag color={statusColor(row.status)} variant="tertiary">{row.status}</Tag>
                  </DataTableCellStatus>
                </DataTableRow>
              );
            })}
          </DataTableBody>
        </DataTable>
      </TableViewport>
    </div>
  );
}

function SortableTable() {
  const [sort, setSort] = React.useState<'ascending' | 'descending'>('descending');
  const rows = React.useMemo(() => {
    return [...replenishmentRows].sort((a, b) => (
      sort === 'ascending' ? a.quantity - b.quantity : b.quantity - a.quantity
    ));
  }, [sort]);

  return (
    <div style={TABLE_FRAME}>
      <TableViewport>
        <DataTable>
          <DataTableHead>
            <DataTableRow>
              <DataTableHeader>Item</DataTableHeader>
              <DataTableHeader>Department</DataTableHeader>
              <DataTableHeader
                alignment="right"
                onSort={() => setSort((current) => current === 'ascending' ? 'descending' : 'ascending')}
                sort={sort}
              >
                Qty
              </DataTableHeader>
              <DataTableHeader width="160px">Due date</DataTableHeader>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {rows.map((row) => (
              <DataTableRow key={row.id}>
                <DataTableCell>{row.item}</DataTableCell>
                <DataTableCell>{row.department}</DataTableCell>
                <DataTableCell variant="numeric">{row.quantity}</DataTableCell>
                <DataTableCell>{row.dueDate}</DataTableCell>
              </DataTableRow>
            ))}
          </DataTableBody>
        </DataTable>
      </TableViewport>
    </div>
  );
}

function InlineEditTable() {
  const [openCell, setOpenCell] = React.useState<string | null>(null);
  const [savedCell, setSavedCell] = React.useState<string | null>('milk-item');
  const [committedValues, setCommittedValues] = React.useState({
    'milk-item': 'Milk 2%',
    'milk-quantity': '24',
    'berries-item': 'Strawberries',
    'berries-quantity': '12',
  });
  const [draftValues, setDraftValues] = React.useState(committedValues);
  const [errors, setErrors] = React.useState<Record<string, string | undefined>>({});

  const updateValue = (key: keyof typeof draftValues, value: string) => {
    setDraftValues((current) => ({...current, [key]: value}));
    setErrors((current) => ({...current, [key]: undefined}));
  };

  const openValue = (key: keyof typeof draftValues) => {
    setDraftValues((current) => ({...current, [key]: committedValues[key]}));
    setErrors((current) => ({...current, [key]: undefined}));
    setOpenCell(key);
  };

  const cancelValue = (key: keyof typeof draftValues) => {
    setDraftValues((current) => ({...current, [key]: committedValues[key]}));
    setErrors((current) => ({...current, [key]: undefined}));
    setOpenCell(null);
  };

  const saveValue = (key: keyof typeof draftValues) => {
    const value = draftValues[key].trim();
    if (!value) {
      setErrors((current) => ({...current, [key]: 'Required'}));
      return;
    }
    setCommittedValues((current) => ({...current, [key]: value}));
    setDraftValues((current) => ({...current, [key]: value}));
    setErrors((current) => ({...current, [key]: undefined}));
    setSavedCell(key);
    setOpenCell(null);
  };

  return (
    <div style={TABLE_FRAME}>
      <DataTableTitle subtitle="Inline edit is for one cell at a time. Open a cell, then save or cancel directly inside that cell.">
        Single-cell edits
      </DataTableTitle>
      <TableViewport reserveEditSpace={openCell !== null}>
        <DataTable>
          <DataTableHead>
            <DataTableRow>
              <DataTableHeader>Editable item</DataTableHeader>
              <DataTableHeader alignment="right">Editable qty</DataTableHeader>
              <DataTableHeader>Status</DataTableHeader>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {[
              {id: 'milk', status: 'Ready'},
              {id: 'berries', status: 'Needs Review'},
            ].map((row) => {
              const itemKey = `${row.id}-item` as keyof typeof draftValues;
              const quantityKey = `${row.id}-quantity` as keyof typeof draftValues;
              return (
                <DataTableRow key={row.id}>
                  <DataTableCellInlineEditTextArea
                    a11yDialogLabel={`Edit ${committedValues[itemKey]} name`}
                    a11yTextAreaLabel="Item name"
                    error={errors[itemKey]}
                    isOpen={openCell === itemKey}
                    isSaved={savedCell === itemKey}
                    onCancel={() => cancelValue(itemKey)}
                    onChange={(event) => updateValue(itemKey, event.target.value)}
                    onOpen={() => openValue(itemKey)}
                    onSave={() => saveValue(itemKey)}
                    value={draftValues[itemKey]}
                  />
                  <DataTableCellInlineEditTextArea
                    a11yDialogLabel={`Edit ${committedValues[itemKey]} quantity`}
                    a11yTextAreaLabel="Item quantity"
                    error={errors[quantityKey]}
                    isOpen={openCell === quantityKey}
                    isSaved={savedCell === quantityKey}
                    onCancel={() => cancelValue(quantityKey)}
                    onChange={(event) => updateValue(quantityKey, event.target.value)}
                    onOpen={() => openValue(quantityKey)}
                    onSave={() => saveValue(quantityKey)}
                    value={draftValues[quantityKey]}
                    variant="numeric"
                  />
                  <DataTableCellStatus>
                    <Tag color={statusColor(row.status)} variant="tertiary">{row.status}</Tag>
                  </DataTableCellStatus>
                </DataTableRow>
              );
            })}
          </DataTableBody>
        </DataTable>
      </TableViewport>
    </div>
  );
}

function BulkEditTable() {
  const committedInitialValues = React.useMemo(() => ({
    apples: 'Apples',
    applesQuantity: '12',
    banana: 'Bananas',
    bananaQuantity: '4',
    grapes: 'Grapes',
    grapesQuantity: '6',
    oranges: 'Oranges',
    orangesQuantity: '10',
  }), []);
  const initialValues = React.useMemo(() => ({
    apples: 'Honeycrisp Apples',
    applesQuantity: '18',
    banana: 'Bananas',
    bananaQuantity: '0',
    grapes: 'Cotton Candy Grapes',
    grapesQuantity: '0',
    oranges: 'Oranges',
    orangesQuantity: '10',
  }), []);
  const [values, setValues] = React.useState(initialValues);
  const [committedValues, setCommittedValues] = React.useState(committedInitialValues);
  const [errors, setErrors] = React.useState<Record<keyof typeof initialValues, string | undefined>>({
    apples: undefined,
    applesQuantity: undefined,
    banana: 'Required',
    bananaQuantity: 'Enter a quantity',
    grapes: undefined,
    grapesQuantity: 'Enter a quantity',
    oranges: undefined,
    orangesQuantity: undefined,
  });
  const [message, setMessage] = React.useState('Purple cells show unsaved edits; red cells show validation errors. Use Continue to validate and save the table step.');

  const updateBulkValue = (key: keyof typeof values, value: string) => {
    setValues((current) => ({...current, [key]: value}));
    setErrors((current) => ({...current, [key]: undefined}));
    setMessage('Unsaved changes in the table step.');
  };

  const isEdited = (key: keyof typeof values) => values[key] !== committedValues[key];

  const validateAndContinue = () => {
    const nextErrors: typeof errors = {
      apples: values.apples.trim() ? undefined : 'Required',
      applesQuantity: Number(values.applesQuantity) > 0 ? undefined : 'Enter a quantity',
      banana: values.banana.trim() ? undefined : 'Required',
      bananaQuantity: Number(values.bananaQuantity) > 0 ? undefined : 'Enter a quantity',
      grapes: values.grapes.trim() ? undefined : 'Required',
      grapesQuantity: Number(values.grapesQuantity) > 0 ? undefined : 'Enter a quantity',
      oranges: values.oranges.trim() ? undefined : 'Required',
      orangesQuantity: Number(values.orangesQuantity) > 0 ? undefined : 'Enter a quantity',
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) {
      setMessage('Resolve the highlighted cells before continuing.');
      return;
    }
    setCommittedValues(values);
    setMessage('Bulk edits saved for this step.');
  };

  const resetBulkValues = () => {
    setValues(committedValues);
    setErrors({
      apples: undefined,
      applesQuantity: undefined,
      banana: undefined,
      bananaQuantity: undefined,
      grapes: undefined,
      grapesQuantity: undefined,
      oranges: undefined,
      orangesQuantity: undefined,
    });
    setMessage('Changes reset to the last saved values.');
  };

  const bulkRows: Array<{
    id: 'apples' | 'banana' | 'grapes' | 'oranges';
    itemKey: keyof typeof values;
    quantityKey: keyof typeof values;
    stateLabel: string;
  }> = [
    {id: 'apples', itemKey: 'apples', quantityKey: 'applesQuantity', stateLabel: 'Edited'},
    {id: 'banana', itemKey: 'banana', quantityKey: 'bananaQuantity', stateLabel: 'Error'},
    {id: 'grapes', itemKey: 'grapes', quantityKey: 'grapesQuantity', stateLabel: 'Edited + error'},
    {id: 'oranges', itemKey: 'oranges', quantityKey: 'orangesQuantity', stateLabel: 'Default'},
  ];

  return (
    <div style={TABLE_FRAME}>
      <DataTableTitle
        subtitle="Bulk edit is for wizard-like flows where every editable text and numeric cell stays active and the save point is outside the cell."
        actions={
          <>
            <Button size="small" variant="secondary" onClick={resetBulkValues}>Reset</Button>
            <Button size="small" variant="primary" onClick={validateAndContinue}>Continue</Button>
          </>
        }
      >
        Bulk edit replenishment
      </DataTableTitle>
      <div style={{padding: '16px'}}>
        <Body>{message}</Body>
      </div>
      <TableViewport>
        <DataTable>
          <DataTableHead>
            <DataTableRow>
              <DataTableHeader id="bulk-edit-item-header">Text variant</DataTableHeader>
              <DataTableHeader id="bulk-edit-qty-header" alignment="right">Numeric variant</DataTableHeader>
              <DataTableHeader>State</DataTableHeader>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {bulkRows.map((row) => {
              const rowHasError = Boolean(errors[row.itemKey] || errors[row.quantityKey]);
              const rowIsEdited = isEdited(row.itemKey) || isEdited(row.quantityKey);
              const tagColor = rowHasError ? 'red' : rowIsEdited ? 'purple' : 'green';

              return (
                <DataTableRow key={row.id}>
                  <DataTableCellBulkEditTextArea
                    a11yTextAreaLabelledBy="bulk-edit-item-header"
                    error={errors[row.itemKey]}
                    isEdited={isEdited(row.itemKey)}
                    onChange={(event) => updateBulkValue(row.itemKey, event.target.value)}
                    value={values[row.itemKey]}
                  />
                  <DataTableCellBulkEditTextArea
                    a11yTextAreaLabelledBy="bulk-edit-qty-header"
                    error={errors[row.quantityKey]}
                    isEdited={isEdited(row.quantityKey)}
                    onChange={(event) => updateBulkValue(row.quantityKey, event.target.value)}
                    value={values[row.quantityKey]}
                    variant="numeric"
                  />
                  <DataTableCellStatus>
                    <Tag color={tagColor} variant="tertiary">{row.stateLabel}</Tag>
                  </DataTableCellStatus>
                </DataTableRow>
              );
            })}
          </DataTableBody>
        </DataTable>
      </TableViewport>
    </div>
  );
}

function DateFilterTable() {
  const [dueDate, setDueDate] = React.useState('05/13/2026');

  return (
    <div style={TABLE_FRAME}>
      <DataTableTitle
        subtitle="Use DateField in title actions when the table needs date entry or filtering."
        actions={
          <DateField
            label="Due date"
            size="small"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />
        }
      >
        Replenishment by due date
      </DataTableTitle>
      <TableViewport>
        <DataTable>
          <DataTableHead>
            <DataTableRow>
              <DataTableHeader>Item</DataTableHeader>
              <DataTableHeader>Department</DataTableHeader>
              <DataTableHeader>Due date</DataTableHeader>
              <DataTableHeader>Status</DataTableHeader>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {replenishmentRows
              .filter((row) => row.dueDate === dueDate || !dueDate)
              .map((row) => (
                <DataTableRow key={row.id}>
                  <DataTableCell>{row.item}</DataTableCell>
                  <DataTableCell>{row.department}</DataTableCell>
                  <DataTableCell>{row.dueDate}</DataTableCell>
                  <DataTableCellStatus>
                    <Tag color={statusColor(row.status)} variant="tertiary">{row.status}</Tag>
                  </DataTableCellStatus>
                </DataTableRow>
              ))}
          </DataTableBody>
        </DataTable>
      </TableViewport>
    </div>
  );
}

function TablePreview({pattern}: {pattern: TablePattern}) {
  if (pattern === 'configurable') return <ConfigurableTable />;
  if (pattern === 'selectable') return <SelectableRowsTable />;
  if (pattern === 'sortable') return <SortableTable />;
  if (pattern === 'inlineEdit') return <InlineEditTable />;
  if (pattern === 'bulkEdit') return <BulkEditTable />;
  if (pattern === 'dateFilter') return <DateFilterTable />;
  return <BasicTable />;
}

export default function DataTablePage() {
  const [pattern, setPattern] = React.useState<TablePattern>('basic');
  const activePattern = PATTERNS.find((item) => item.value === pattern) ?? PATTERNS[0];

  return (
    <PageWrapper
      title="Data Table"
      category="Core Components"
      description="Tabular layout for related row and column data, with optional titles, sorting, selection, and edit states."
    >
      <ExampleSection
        title="Component Configuration"
        description="Switch between the table patterns most often needed for operational workflows."
      >
        <div style={CONFIGURATION_STACK}>
          <DocsCard
            title="Table pattern"
            description="Choose the behavior that matches the table task."
          >
            <PatternSelector pattern={pattern} onPatternChange={setPattern} />
          </DocsCard>
          <DocsCard title={activePattern.label} description={activePattern.description}>
            <TablePreview pattern={pattern} />
          </DocsCard>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Table Patterns"
        description="Each card demonstrates a common combination of subcomponents."
      >
        <div style={PATTERN_STACK}>
          {PATTERNS.map((item) => (
            <DocsCard key={item.value} title={item.label} description={item.description}>
              <TablePreview pattern={item.value} />
            </DocsCard>
          ))}
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use Data Table for dense, comparable row data. Keep headers short, align numeric values to the right, and use status cells or tags when state needs to be scanned quickly. Add bulk actions only after selection is available, and keep edit states visible enough that users can recover before saving."
        defaultValue="DataTable with DataTableHead, DataTableBody, DataTableRow, DataTableHeader, and DataTableCell"
      />
    </PageWrapper>
  );
}
