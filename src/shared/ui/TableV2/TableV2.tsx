import classNames from 'classnames';

import { getColumnWidthStyle, getTableMinWidth } from './columnWidth';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';
import styles from './TableV2.module.css';
import type { TableRowId, TableV2Props } from './types';
import { useHorizontalScrollEdges } from './useHorizontalScrollEdges';
import { useTableSelection } from './useTableSelection';

const getDefaultRowId = <T,>(row: T): TableRowId => {
	return (row as unknown as { id: TableRowId }).id;
};

export const TableV2 = <
	T,
	TSortingColumnId extends Extract<keyof T, string> = Extract<keyof T, string>,
>({
	data,
	columns,
	getRowId,
	sorting,
	onSortingChange,
	tableState,
	selectedRowIds,
	onSelectedRowIdsChange,
	isRowSelectionDisabled,
	entity,
	actions = [],
	onDelete,
}: TableV2Props<T, TSortingColumnId>) => {
	const resolveRowId = getRowId ?? getDefaultRowId;
	const hasRowActions = actions.length > 0 && Boolean(entity);

	const {
		selectionEnabled,
		selectedIds,
		allRowsSelected,
		selectionIntermediate,
		selectionDisabled,
		isRowDisabled,
		toggleAllRows,
		toggleRow,
	} = useTableSelection({
		data,
		getRowId: resolveRowId,
		selectedRowIds,
		onSelectedRowIdsChange,
		isRowSelectionDisabled,
	});

	const hasPinnedColumns = selectionEnabled || hasRowActions;
	const tableMinWidth = getTableMinWidth(
		columns.map((column) => column.width),
		selectionEnabled,
	);
	const { scrollRef, leftSentinelRef, rightSentinelRef, leftShadowRef, rightShadowRef } =
		useHorizontalScrollEdges(hasPinnedColumns);
	const selectionCellClassName = classNames(
		styles['selection-column'],
		styles.pinned,
		styles['pinned-left'],
	);
	const actionsCellClassName = classNames(
		styles['actions-column'],
		styles.pinned,
		styles['pinned-right'],
	);

	const table = (
		<table className={styles.table} style={tableMinWidth ? { minWidth: tableMinWidth } : undefined}>
			<colgroup>
				{selectionEnabled && <col className={styles['selection-column']} />}
				{columns.map((column) => (
					<col key={column.id} style={getColumnWidthStyle(column.width)} />
				))}
				{hasRowActions && <col />}
			</colgroup>
			<TableHeader
				columns={columns}
				headClassName={styles.head}
				cellClassName={styles.cell}
				selectionEnabled={selectionEnabled}
				allRowsSelected={allRowsSelected}
				selectionIntermediate={selectionIntermediate}
				selectionDisabled={selectionDisabled}
				selectionCellClassName={selectionCellClassName}
				onToggleAllRows={toggleAllRows}
				hasRowActions={hasRowActions}
				actionsCellClassName={actionsCellClassName}
				sorting={sorting}
				onSortingChange={onSortingChange}
				isFetching={tableState?.isFetching}
				sortButtonClassName={styles['sort-button']}
			/>
			<TableBody
				data={data}
				columns={columns}
				getRowId={resolveRowId}
				rowClassName={styles.row}
				cellClassName={styles.cell}
				selectionEnabled={selectionEnabled}
				selectedIds={selectedIds}
				selectionCellClassName={selectionCellClassName}
				isRowDisabled={isRowDisabled}
				onToggleRow={toggleRow}
				hasRowActions={hasRowActions}
				actionsCellClassName={actionsCellClassName}
				entity={entity}
				actions={actions}
				onDelete={onDelete}
			/>
		</table>
	);

	return (
		<div ref={scrollRef} className={styles.scroll}>
			{hasPinnedColumns ? (
				<div className={styles.canvas}>
					{selectionEnabled && (
						<>
							<div ref={leftSentinelRef} className={styles['sentinel-left']} aria-hidden />
							<div ref={leftShadowRef} className={styles['shadow-left']} aria-hidden />
						</>
					)}
					{table}
					{hasRowActions && (
						<>
							<div ref={rightShadowRef} className={styles['shadow-right']} aria-hidden />
							<div ref={rightSentinelRef} className={styles['sentinel-right']} aria-hidden />
						</>
					)}
				</div>
			) : (
				table
			)}
		</div>
	);
};
