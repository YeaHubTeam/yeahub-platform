import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';
import styles from './TableV2.module.css';
import type { TableV2Props } from './types';

export const TableV2 = <T,>({ data, columns, getRowId }: TableV2Props<T>) => {
	return (
		<table className={styles.table}>
			<TableHeader columns={columns} headClassName={styles.head} cellClassName={styles.cell} />
			<TableBody
				data={data}
				columns={columns}
				getRowId={getRowId}
				rowClassName={styles.row}
				cellClassName={styles.cell}
			/>
		</table>
	);
};
