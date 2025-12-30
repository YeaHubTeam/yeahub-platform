import { ReactNode } from 'react';

import { SelectedEntities, SelectedEntity } from '@/shared/libs';
import { Checkbox } from '@/shared/ui/Checkbox';
import { CopyButton } from '@/shared/ui/CopyButton';

import styles from './Table.module.css';

interface TableProps<Id extends string | number, T> {
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
	renderTableBody: (item: T, index?: number) => ReactNode;
	/**
	 * Render function for displaying the table actions in the last column
	 */
	renderActions?: (item: T) => ReactNode;
	selectedItems?: SelectedEntities<Id>;
	onSelectItems?: (ids: SelectedEntities<Id>) => void;
	/**
	 * Render function for defining column widths in the table.
	 */
	renderTableColumnWidths?: () => ReactNode;
	/**
	 * Shows a copy button
	 */
	hasCopyButton?: boolean;
}

/**
 * Component that is used to display data in a tabular structure.
 *
 * @param items - Array of elements displayed in the table.
 * @param renderTableHeader - Render function for displaying the table header.
 * @param renderTableBody - Render function for displaying the table body.
 * @param renderActions - Render function for displaying the table actions in the last column.
 * @param selectedItems - Array of currently selected entities.
 * @param onSelectItems - Callback function triggered when selection changes.
 */
export const Table = <Id extends string | number, T extends SelectedEntity<Id>>({
	items,
	renderTableHeader,
	renderTableBody,
	renderActions,
	selectedItems,
	onSelectItems,
	renderTableColumnWidths,
	hasCopyButton,
}: TableProps<Id, T>) => {
	const hasActions = !!renderActions;

	const isAllSelected = selectedItems?.length === items.length;
	const selectedItemsIds = selectedItems?.map(({ id }) => id) || [];

	const onSelectAllItems = () => {
		onSelectItems?.(isAllSelected ? [] : items.map((item) => ({ id: item.id, title: item.title })));
	};

	const onSelectItem = (item: SelectedEntity<Id>) => () => {
		if (selectedItems) {
			const isSelected = selectedItemsIds?.includes(item.id);
			const itemsIds: SelectedEntities<Id> = isSelected
				? selectedItems?.filter((selectedItem) => selectedItem.id !== item.id)
				: [...selectedItems, item];
			onSelectItems?.(itemsIds);
		}
	};

	return (
		<table className={styles.table} data-testid="table">
			<colgroup>
				{selectedItems && <col className={styles.cell} />}
				{renderTableColumnWidths?.()}
				{hasActions && <col className={styles['actions-column']} />}
				{hasCopyButton && <col className={styles['actions-column']} />}
			</colgroup>
			<thead className={`${styles.head} ${styles.bg}`}>
				<tr>
					{selectedItems && (
						<td className={styles.cell}>
							<Checkbox checked={isAllSelected} onChange={onSelectAllItems} />
						</td>
					)}
					{renderTableHeader()}
					{hasActions && <td className={styles['actions-column']}></td>}
					{hasCopyButton && <td className={styles['actions-column']}></td>}
				</tr>
			</thead>
			<tbody>
				{items.map((item, index) => (
					<tr key={item.id} className={styles.row} data-testid="table-row">
						{selectedItems && (
							<td className={styles.cell}>
								<Checkbox
									checked={selectedItemsIds?.includes(item.id)}
									onChange={onSelectItem({ id: item.id, title: item.title })}
									disabled={item.disabled}
								/>
							</td>
						)}
						{renderTableBody(item, index)}
						{hasActions && <td className={styles['actions-column']}>{renderActions?.(item)}</td>}
						{hasCopyButton && (
							<td className={styles['actions-column']}>
								<CopyButton data-testid="Table_CopyButton" text={item.id} />
							</td>
						)}
					</tr>
				))}
			</tbody>
		</table>
	);
};
