import type { ReactNode } from 'react';

import type { TableAction, TableActionsEntity } from '@/shared/ui/TableActions';

export type TableRowId = string | number;

export type SortDirection = 'ASC' | 'DESC';

export type SortingState<TColumnId extends string = string> = {
	columnId: TColumnId;
	direction: SortDirection;
} | null;

export interface TableState {
	isFetching?: boolean;
}

export interface TableCellContext<T> {
	row: T;
	value: unknown;
	rowIndex: number;
}

interface TableColumnBase<T> {
	id: Extract<keyof T, string>;
	header: ReactNode;
	accessor?: (row: T) => unknown;
	cell?: (context: TableCellContext<T>) => ReactNode;
	width?: string;
}

export type TableColumn<
	T,
	TSortingColumnId extends Extract<keyof T, string> = Extract<keyof T, string>,
> =
	| (TableColumnBase<T> & {
			id: TSortingColumnId;
			enableSorting: true;
	  })
	| (TableColumnBase<T> & {
			enableSorting?: false;
	  });

interface TableV2BaseProps<
	T,
	TSortingColumnId extends Extract<keyof T, string> = Extract<keyof T, string>,
> {
	data: T[];
	columns: TableColumn<T, TSortingColumnId>[];
	sorting?: SortingState<TSortingColumnId>;
	onSortingChange?: (sorting: SortingState<TSortingColumnId>) => void;
	tableState?: TableState;
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

export type TableV2Props<
	T,
	TSortingColumnId extends Extract<keyof T, string> = Extract<keyof T, string>,
> = TableV2BaseProps<T, TSortingColumnId> & TableV2RowIdProps<T>;
