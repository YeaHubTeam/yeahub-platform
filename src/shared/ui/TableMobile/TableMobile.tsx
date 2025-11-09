import { ReactNode } from 'react';

import styles from './TableMobile.module.css';

interface TableMobileProps<T> {
	/**
	 * Array of elements displayed in the table
	 */
	items: T[];
	/**
	 * Render function for displaying the table header
	 */
	renderTableMobileHead: (item: T) => ReactNode;
	/**
	 * Render function for displaying the table body
	 */
	renderTableMobileBody: (item: T, index?: number) => ReactNode;
}

/**
 * Component that is used to display data in a tabular structure.
 *
 * @param items - Array of elements displayed in the table.
 * @param renderTableMobileHead - Render function for displaying the table header.
 * @param renderTableMobileBody - Render function for displaying the table body.
 */

export const TableMobile = <T,>({
	items,
	renderTableMobileBody,
	renderTableMobileHead,
}: TableMobileProps<T>) => {
	return (
		<>
			{items.map((item, index) => (
				<div key={index} className={styles.wrapper}>
					<table className={styles.table}>
						<thead>{renderTableMobileHead(item)}</thead>
						<tbody>{renderTableMobileBody(item, index)}</tbody>
					</table>
				</div>
			))}
		</>
	);
};
