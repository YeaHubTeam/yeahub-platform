import { TableCell } from './TableCell';
import type { TableColumn, TableRowId } from './types';

interface TableBodyProps<T> {
	data: T[];
	columns: TableColumn<T>[];
	getRowId: (row: T) => TableRowId;
	rowClassName?: string;
	cellClassName?: string;
}

export const TableBody = <T,>({
	data,
	columns,
	getRowId,
	rowClassName,
	cellClassName,
}: TableBodyProps<T>) => {
	return (
		<tbody>
			{data.map((row, rowIndex) => (
				<tr key={getRowId(row)} className={rowClassName}>
					{columns.map((column) => (
						<TableCell
							key={column.id}
							column={column}
							row={row}
							rowIndex={rowIndex}
							className={cellClassName}
						/>
					))}
				</tr>
			))}
		</tbody>
	);
};
