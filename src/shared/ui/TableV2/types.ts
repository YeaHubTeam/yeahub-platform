import type { ReactNode } from 'react';

import type { TableAction, TableActionsEntity } from '@/shared/ui/TableActions';

export type TableRowId = string | number;

export interface TableCellContext<T> {
	row: T;
	value: unknown;
	rowIndex: number;
}

export interface TableColumn<T> {
	id: Extract<keyof T, string>;
	header: ReactNode;
	accessor?: (row: T) => unknown;
	cell?: (context: TableCellContext<T>) => ReactNode;
	width?: string;
}

interface TableV2BaseProps<T> {
	data: T[];
	columns: TableColumn<T>[];
	selectedRowIds?: readonly TableRowId[];
	onSelectedRowIdsChange?: (ids: TableRowId[]) => void;
	isRowSelectionDisabled?: (row: T) => boolean;
	actions?: TableAction[];
	entity?: TableActionsEntity;
	onDelete?: (id: TableRowId) => void;
}

type TableV2RowIdProps<T> = T extends { id: TableRowId }
	? { getRowId?: (row: T) => TableRowId }
	: { getRowId: (row: T) => TableRowId };

export type TableV2Props<T> = TableV2BaseProps<T> & TableV2RowIdProps<T>;
