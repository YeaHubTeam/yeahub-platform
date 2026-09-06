import { useTranslation } from 'react-i18next';

import { i18Namespace, Tasks } from '@/shared/config';
import { SortOrder } from '@/shared/libs';
import { BaseFilterItem, BaseFilterSection } from '@/shared/ui/BaseFilterSection';

interface SortTasksByOrderProps {
	selectedOrder?: SortOrder;
	onChangeSortOrder: (sortOrder?: SortOrder) => void;
}

export const SortTasksByOrder = ({ onChangeSortOrder, selectedOrder }: SortTasksByOrderProps) => {
	const { t } = useTranslation(i18Namespace.task);

	const order: BaseFilterItem<SortOrder>[] = [
		{ id: 'ASC', title: t(Tasks.SORT_ASC) },
		{ id: 'DESC', title: t(Tasks.SORT_DESC) },
	];

	const preparedData = order.map((item) => ({
		...item,
		active: selectedOrder === item.id,
	}));

	const onChangeOrder = (orderBy: SortOrder) => {
		onChangeSortOrder(orderBy === selectedOrder ? undefined : orderBy);
	};

	return (
		<BaseFilterSection
			title={t(Tasks.SORT_ORDER_TITLE)}
			onClick={onChangeOrder}
			data={preparedData}
		/>
	);
};
