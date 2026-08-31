import type { ReactNode } from 'react';

import { Checkbox } from '@/shared/ui/Checkbox';

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
	renderRowActions?: (row: T) => ReactNode;
	actionsCellClassName?: string;
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
	renderRowActions,
	actionsCellClassName,
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
						{renderRowActions && (
							<td className={actionsCellClassName} onClick={(event) => event.stopPropagation()}>
								{renderRowActions(row)}
							</td>
						)}
					</tr>
				);
			})}
		</tbody>
	);
};
