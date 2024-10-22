import { ReactNode } from 'react';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

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
	const { t } = useI18nHelpers(i18Namespace.translation);

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
						<input type="checkbox" checked={isAllSelected} onChange={onSelectAllItems} />
					</td>
					{renderTableHeader()}
					{hasActions && <td>{t(Translation.ACTIONS)}</td>}
				</tr>
			</thead>
			<tbody>
				{items.map((item) => (
					<tr key={item.id} className={styles.row}>
						<td className={styles.cell}>
							<input
								type="checkbox"
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
