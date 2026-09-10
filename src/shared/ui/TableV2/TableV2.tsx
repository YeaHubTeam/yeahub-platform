import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';
import styles from './TableV2.module.css';
import type { TableRowId, TableV2Props } from './types';

const getDefaultRowId = <T,>(row: T): TableRowId => {
	return (row as unknown as { id: TableRowId }).id;
};

export const TableV2 = <T,>({ data, columns, getRowId }: TableV2Props<T>) => {
	return (
		<table className={styles.table}>
			<TableHeader columns={columns} headClassName={styles.head} cellClassName={styles.cell} />
			<TableBody
				data={data}
				columns={columns}
				getRowId={getRowId ?? getDefaultRowId}
				rowClassName={styles.row}
				cellClassName={styles.cell}
			/>
		</table>
	);
};
