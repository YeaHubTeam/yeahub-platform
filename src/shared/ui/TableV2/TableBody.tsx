import { Checkbox } from '@/shared/ui/Checkbox';
import { TableActions, type TableAction, type TableActionsEntity } from '@/shared/ui/TableActions';

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
	hasRowActions?: boolean;
	actionsCellClassName?: string;
	actions?: TableAction[];
	entity?: TableActionsEntity;
	disabledActionsTooltipTitle?: string;
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
	hasRowActions,
	actionsCellClassName,
	entity,
	actions = [],
	disabledActionsTooltipTitle,
	onDelete,
}: TableBodyProps<T>) => {
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
						{hasRowActions && (
							<td className={actionsCellClassName} onClick={(event) => event.stopPropagation()}>
								{entity && (
									<TableActions
										entity={entity}
										actions={actions}
										onDelete={() => onDelete?.(rowId)}
										id={rowId}
										disabled={disabled}
										disabledTooltipTitle={disabledActionsTooltipTitle}
									/>
								)}
							</td>
						)}
					</tr>
				);
			})}
		</tbody>
	);
};
