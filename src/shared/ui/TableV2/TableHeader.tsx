import { Checkbox } from '@/shared/ui/Checkbox';

import type { TableColumn } from './types';

interface TableHeaderProps<T> {
	columns: TableColumn<T>[];
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
}

export const TableHeader = <T,>({
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
}: TableHeaderProps<T>) => {
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
				{columns.map(({ id, header }) => (
					<th key={id} className={cellClassName} scope="col">
						{header}
					</th>
				))}
				{hasRowActions && <th scope="col" className={actionsCellClassName} aria-label="Действия" />}
			</tr>
		</thead>
	);
};
