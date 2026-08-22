import type { ReactNode } from 'react';

import type { TableColumn } from './types';

interface TableCellProps<T> {
	column: TableColumn<T>;
	row: T;
	rowIndex: number;
	className?: string;
}

const renderCellValue = (value: unknown): ReactNode => {
	if (value === null || value === undefined || typeof value === 'boolean') {
		return null;
	}

	if (typeof value === 'string' || typeof value === 'number') {
		return value;
	}

	return String(value);
};

export const TableCell = <T,>({ column, row, rowIndex, className }: TableCellProps<T>) => {
	const value = column.accessor ? column.accessor(row) : row[column.id];
	const content = column.cell ? column.cell({ row, value, rowIndex }) : renderCellValue(value);

	return <td className={className}>{content}</td>;
};
