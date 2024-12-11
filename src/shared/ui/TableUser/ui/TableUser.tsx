import { ReactNode } from 'react';

import { SelectedAdminEntityOther } from '@/shared/types/types';

import styles from './TableUser.module.css';

interface TableProps<T> {
	/**
	 * Array of elements displayed in the table
	 */
	items: T[];
	/**
	 * Render function for displaying the table header
	 */
	renderTableHeader: () => ReactNode;
	/**
	 * Render function for displaying the table body
	 */
	renderTableBody: (item: T) => ReactNode;
	/**
	 * Render function for displaying the table actions in the last column
	 */
	renderActions?: (item: T) => ReactNode;
}

/**
 * Component that is used to display data in a tabular structure
 * @param items
 * @param renderTableHeader
 * @param renderTableBody
 * @param renderActions
 * @constructor
 */
export const TableUser = <T extends SelectedAdminEntityOther>({
	items,
	renderTableHeader,
	renderTableBody,
	renderActions,
}: TableProps<T>) => {
	const hasActions = !!renderActions;
	return (
		<table className={styles.table}>
			<thead className={styles.head}>
				<tr>
					{renderTableHeader()}
					{hasActions && <td className={styles.actionsColumn}></td>}
				</tr>
			</thead>
			<tbody>
				{items.map((item) => (
					<tr key={item.id} className={styles.row}>
						{renderTableBody(item)}
						{hasActions && <td>{renderActions?.(item)}</td>}
					</tr>
				))}
			</tbody>
		</table>
	);
};
