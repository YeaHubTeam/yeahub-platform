import { Checkbox } from '@/shared/ui/Checkbox';
import { TableAction, TableActions, TableActionsEntity } from '@/shared/ui/TableActions';

import { TableCell } from './TableCell';
import type { TableColumn, TableRowId } from './types';

interface TableBodyProps<T> {
	data: T[];
	columns: TableColumn<T>[];
	getRowId: (row: T) => TableRowId;
	rowClassName?: string;
	cellClassName?: string;
	selectionEnabled?: boolean;
	selectedIds?: Set<TableRowId>;
	selectionCellClassName?: string;
	isRowDisabled?: (row: T) => boolean;
	onToggleRow?: (row: T) => void;
	actionsCellClassName?: string;
	actions?: TableAction[];
	entity?: TableActionsEntity;
	onDelete?: (id: TableRowId) => void;
}

export const TableBody = <T,>({
	data,
	columns,
	getRowId,
	rowClassName,
	cellClassName,
	selectionEnabled,
	selectedIds,
	selectionCellClassName,
	isRowDisabled,
	onToggleRow,
	actionsCellClassName,
	entity,
	actions = [],
	onDelete,
}: TableBodyProps<T>) => {
	const hasAction = actions.length > 0 && entity;

	return (
		<tbody>
			{data.map((row, rowIndex) => {
				const rowId = getRowId(row);
				const disabled = isRowDisabled?.(row) ?? false;

				return (
					<tr key={rowId} className={rowClassName}>
						{selectionEnabled && (
							<td className={selectionCellClassName} onClick={(event) => event.stopPropagation()}>
								<Checkbox
									checked={selectedIds?.has(rowId)}
									onChange={() => onToggleRow?.(row)}
									disabled={disabled}
								/>
							</td>
						)}
						{columns.map((column) => (
							<TableCell
								key={column.id}
								column={column}
								row={row}
								rowIndex={rowIndex}
								className={cellClassName}
							/>
						))}
						{hasAction && (
							<td className={actionsCellClassName} onClick={(event) => event.stopPropagation()}>
								<TableActions
									entity={entity}
									actions={actions}
									onDelete={() => onDelete?.(rowId)}
									id={rowId}
									disabled={disabled}
								/>
							</td>
						)}
					</tr>
				);
			})}
		</tbody>
	);
};
