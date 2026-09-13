import { Checkbox } from '@/shared/ui/Checkbox';
import { Icon, type IconName } from '@/shared/ui/Icon';

import { getNextSorting } from './getNextSorting';
import type { SortingState, TableColumn } from './types';

interface TableHeaderProps<T, TSortingColumnId extends Extract<keyof T, string>> {
	columns: TableColumn<T, TSortingColumnId>[];
	headClassName?: string;
	cellClassName?: string;
	selectionEnabled?: boolean;
	allRowsSelected?: boolean;
	selectionIntermediate?: boolean;
	selectionDisabled?: boolean;
	selectionCellClassName?: string;
	onToggleAllRows?: () => void;
	hasRowActions?: boolean;
	actionsCellClassName?: string;
	sorting?: SortingState<TSortingColumnId>;
	onSortingChange?: (sorting: SortingState<TSortingColumnId>) => void;
	isFetching?: boolean;
	sortButtonClassName?: string;
}

const getSortIconName = (columnId: string, sorting?: SortingState): IconName => {
	if (sorting?.columnId !== columnId) {
		return 'squareSortVertical';
	}

	return sorting.direction === 'ASC' ? 'arrowUpSquare' : 'arrowDownSquare';
};

const getAriaSort = (
	sortingAvailable: boolean,
	isSorted: boolean,
	sorting?: SortingState,
): 'none' | 'ascending' | 'descending' | undefined => {
	if (!sortingAvailable) {
		return undefined;
	}

	if (!isSorted) {
		return 'none';
	}

	return sorting?.direction === 'ASC' ? 'ascending' : 'descending';
};

export const TableHeader = <T, TSortingColumnId extends Extract<keyof T, string>>({
	columns,
	headClassName,
	cellClassName,
	selectionEnabled,
	allRowsSelected,
	selectionIntermediate,
	selectionDisabled,
	selectionCellClassName,
	onToggleAllRows,
	hasRowActions,
	actionsCellClassName,
	sorting,
	onSortingChange,
	isFetching,
	sortButtonClassName,
}: TableHeaderProps<T, TSortingColumnId>) => {
	return (
		<thead className={headClassName}>
			<tr>
				{selectionEnabled && (
					<th scope="col" className={selectionCellClassName}>
						<Checkbox
							checked={allRowsSelected}
							isIntermediate={selectionIntermediate}
							disabled={selectionDisabled}
							onChange={onToggleAllRows}
						/>
					</th>
				)}
				{columns.map((column) => {
					const sortingAvailable = Boolean(column.enableSorting && onSortingChange);
					const isSorted = sorting?.columnId === column.id;

					return (
						<th
							key={column.id}
							className={cellClassName}
							scope="col"
							aria-sort={getAriaSort(sortingAvailable, isSorted, sorting)}
						>
							{column.enableSorting && onSortingChange ? (
								<button
									type="button"
									className={sortButtonClassName}
									disabled={isFetching}
									onClick={() => onSortingChange(getNextSorting(column.id, sorting))}
								>
									{column.header}
									<Icon icon={getSortIconName(column.id, sorting)} size={20} aria-hidden />
								</button>
							) : (
								column.header
							)}
						</th>
					);
				})}
				{hasRowActions && <th scope="col" className={actionsCellClassName} aria-label="Действия" />}
			</tr>
		</thead>
	);
};
