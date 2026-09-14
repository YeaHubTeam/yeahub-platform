import type { TableColumn } from './types';

interface TableHeaderProps<T> {
	columns: TableColumn<T>[];
	headClassName?: string;
	cellClassName?: string;
}

export const TableHeader = <T,>({ columns, headClassName, cellClassName }: TableHeaderProps<T>) => {
	return (
		<thead className={headClassName}>
			<tr>
				{columns.map(({ id, header }) => (
					<th key={id} className={cellClassName} scope="col">
						{header}
					</th>
				))}
			</tr>
		</thead>
	);
};
