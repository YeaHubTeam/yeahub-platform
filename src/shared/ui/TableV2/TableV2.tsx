import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';
import styles from './TableV2.module.css';
import type { TableRowId, TableV2Props } from './types';
import { useTableSelection } from './useTableSelection';

const getDefaultRowId = <T,>(row: T): TableRowId => {
	return (row as unknown as { id: TableRowId }).id;
};

export const TableV2 = <T,>({
	data,
	columns,
	getRowId,
	selectedRowIds,
	onSelectedRowIdsChange,
	isRowSelectionDisabled,
	renderRowActions,
}: TableV2Props<T>) => {
	const resolveRowId = getRowId ?? getDefaultRowId;
	const hasRowActions = Boolean(renderRowActions);

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

	return (
		<table className={styles.table}>
			{(selectionEnabled || hasRowActions) && (
				<colgroup>
					{selectionEnabled && <col className={styles['selection-column']} />}
					{columns.map((column) => (
						<col key={column.id} />
					))}
					{hasRowActions && <col className={styles['actions-column']} />}
				</colgroup>
			)}
			<TableHeader
				columns={columns}
				headClassName={styles.head}
				cellClassName={styles.cell}
				selectionEnabled={selectionEnabled}
				allRowsSelected={allRowsSelected}
				selectionIntermediate={selectionIntermediate}
				selectionDisabled={selectionDisabled}
				selectionCellClassName={styles['selection-column']}
				onToggleAllRows={toggleAllRows}
				hasRowActions={hasRowActions}
				actionsCellClassName={styles['actions-column']}
			/>
			<TableBody
				data={data}
				columns={columns}
				getRowId={resolveRowId}
				rowClassName={styles.row}
				cellClassName={styles.cell}
				selectionEnabled={selectionEnabled}
				selectedIds={selectedIds}
				selectionCellClassName={styles['selection-column']}
				isRowDisabled={isRowDisabled}
				onToggleRow={toggleRow}
				renderRowActions={renderRowActions}
				actionsCellClassName={styles['actions-column']}
			/>
		</table>
	);
};
