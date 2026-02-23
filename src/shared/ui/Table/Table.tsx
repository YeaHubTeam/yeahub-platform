import classnames from 'classnames';
import { ReactNode } from 'react';

import { SelectedEntities, SelectedEntity } from '@/shared/libs';
import { Checkbox } from '@/shared/ui/Checkbox';
import { CopyButton } from '@/shared/ui/CopyButton';

import styles from './Table.module.css';

interface TableProps<Id extends string | number, T> {
	items: T[];
	renderTableHeader: () => ReactNode;
	renderTableBody: (item: T, index?: number) => ReactNode;
	renderActions?: (item: T) => ReactNode;
	selectedItems?: SelectedEntities<Id>;
	onSelectItems?: (ids: SelectedEntities<Id>) => void;
	renderTableColumnWidths?: () => ReactNode;
	hasCopyButton?: boolean;
	onRowClick?: (item: T) => void;
}

export const Table = <Id extends string | number, T extends SelectedEntity<Id>>({
	items,
	renderTableHeader,
	renderTableBody,
	renderActions,
	selectedItems,
	onSelectItems,
	renderTableColumnWidths,
	hasCopyButton,
	onRowClick,
}: TableProps<Id, T>) => {
	const hasActions = !!renderActions;

	const availableItems = items.filter((item) => !item.disabled);
	const availableCount = availableItems.length;
	const selectedItemsIds = selectedItems?.map(({ id }) => id) || [];

	const availableSelected =
		selectedItems?.filter((s) => availableItems.some((item) => item.id === s.id)) || [];
	const allSelected = availableSelected.length;
	const isAllSelected = allSelected === availableCount && availableCount > 0;
	const isIntermediate = allSelected > 0 && allSelected < availableCount;

	const isHeaderDisabled = availableCount === 0;

	const onSelectAllItems = () => {
		if (isHeaderDisabled) return;

		onSelectItems?.(
			isAllSelected
				? []
				: availableItems.map((item) => ({
						id: item.id,
						title: item.title,
						disabled: item.disabled,
					})),
		);
	};

	const onSelectItem = (item: SelectedEntity<Id>) => () => {
		if (item.disabled) return;

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
							<Checkbox
								checked={isAllSelected}
								onChange={onSelectAllItems}
								isIntermediate={isIntermediate}
								disabled={isHeaderDisabled}
							/>
						</td>
					)}
					{renderTableHeader()}
					{hasActions && <td className={styles['actions-column']}></td>}
					{hasCopyButton && <td className={styles['actions-column']}></td>}
				</tr>
			</thead>
			<tbody>
				{items.map((item, index) => (
					<tr
						key={item.id}
						className={classnames(styles.row, { [styles.click]: !!onRowClick })}
						data-testid="table-row"
						onClick={() => onRowClick?.(item)}
					>
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
