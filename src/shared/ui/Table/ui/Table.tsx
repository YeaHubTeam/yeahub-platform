import { ReactNode } from 'react';
import { Checkbox } from 'yeahub-ui-kit';

import styles from './Table.module.css';

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
	selectedItems?: number[];
	onSelectItems?: (ids: number[]) => void;
}

/**
 * Component that is used to display data in a tabular structure
 * @param items
 * @param renderTableHeader
 * @param renderTableBody
 * @param renderActions
 * @constructor
 */
export const Table = <T extends { id: number }>({
	items,
	renderTableHeader,
	renderTableBody,
	renderActions,
	selectedItems,
	onSelectItems,
}: TableProps<T>) => {
	const hasActions = !!renderActions;

	const isAllSelected = selectedItems?.length === items.length;

	const onSelectAllItems = () => {
		const itemsIds = items.map(({ id }) => id);
		onSelectItems?.(isAllSelected ? [] : itemsIds);
	};

	const onSelectItem = (id: number) => () => {
		if (selectedItems) {
			const isSelected = selectedItems?.includes(id);
			const itemsIds: number[] = isSelected
				? selectedItems?.filter((selectedItem) => selectedItem !== id)
				: [...selectedItems, id];
			onSelectItems?.(itemsIds);
		}
	};

	return (
		<table className={styles.table}>
			<thead className={styles.head}>
				<tr>
					<td className={styles.cell}>
						<Checkbox checked={isAllSelected} onChange={onSelectAllItems} />
					</td>
					{renderTableHeader()}
					{hasActions && <td className={styles.actionsColumn}></td>}
				</tr>
			</thead>
			<tbody>
				{items.map((item) => (
					<tr key={item.id} className={styles.row}>
						<td className={styles.cell}>
							<Checkbox
								checked={selectedItems?.includes(item.id)}
								onChange={onSelectItem(item.id)}
							/>
						</td>
						{renderTableBody(item)}
						{hasActions && <td>{renderActions?.(item)}</td>}
					</tr>
				))}
			</tbody>
		</table>
	);
};
