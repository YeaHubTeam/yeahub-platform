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
}: TableV2Props<T>) => {
	const resolveRowId = getRowId ?? getDefaultRowId;

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
			{selectionEnabled && (
				<colgroup>
					<col className={styles['selection-column']} />
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
			/>
		</table>
	);
};
