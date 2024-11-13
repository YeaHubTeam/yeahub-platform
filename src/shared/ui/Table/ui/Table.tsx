import { ReactNode } from 'react';
import { Checkbox } from 'yeahub-ui-kit';

import { SelectedAdminEntities, SelectedAdminEntity } from '@/shared/types/types';

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
	selectedItems?: SelectedAdminEntities;
	onSelectItems?: (ids: SelectedAdminEntities) => void;
}

/**
 * Component that is used to display data in a tabular structure
 * @param items
 * @param renderTableHeader
 * @param renderTableBody
 * @param renderActions
 * @constructor
 */
export const Table = <T extends SelectedAdminEntity>({
	items,
	renderTableHeader,
	renderTableBody,
	renderActions,
	selectedItems,
	onSelectItems,
}: TableProps<T>) => {
	const hasActions = !!renderActions;

	const isAllSelected = selectedItems?.length === items.length;
	const selectedItemsIds = selectedItems?.map(({ id }) => id) || [];

	const onSelectAllItems = () => {
		onSelectItems?.(isAllSelected ? [] : items.map((item) => ({ id: item.id, title: item.title })));
	};

	const onSelectItem = (item: SelectedAdminEntity) => () => {
		if (selectedItems) {
			const isSelected = selectedItemsIds?.includes(item.id);
			const itemsIds: SelectedAdminEntities = isSelected
				? selectedItems?.filter((selectedItem) => selectedItem.id !== item.id)
				: [...selectedItems, item];
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
								checked={selectedItemsIds?.includes(item.id)}
								onChange={onSelectItem({ id: item.id, title: item.title })}
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
