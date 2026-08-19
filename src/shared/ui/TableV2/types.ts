import type { ReactNode } from 'react';

export type TableRowId = string | number;

export interface TableCellContext<T> {
	row: T;
	value: unknown;
	rowIndex: number;
}

export interface TableColumn<T> {
	id: string;
	header: ReactNode;
	accessor: (row: T) => unknown;
	cell?: (context: TableCellContext<T>) => ReactNode;
}

export interface TableV2Props<T> {
	data: T[];
	columns: TableColumn<T>[];
	getRowId: (row: T) => TableRowId;
}
