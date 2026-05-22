import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { i18Namespace, Tasks } from '@/shared/config';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { SORT_ORDER_DATA } from '../../model/constants/sort';

interface SortTasksByOrderProps {
	onChangeSortOrder: (sortOrder?: string | undefined) => void;
}

export const SortTasksByOrder = ({ onChangeSortOrder }: SortTasksByOrderProps) => {
	const [searchParams] = useSearchParams();
	const currentSort = searchParams?.get('sortOrder');
	const { t } = useTranslation(i18Namespace.task);

	const updatedSortOrderData = SORT_ORDER_DATA.map((order) => ({
		...order,
		title: t(order.label),
		active: currentSort === order.value,
	}));

	const onChooseSortOrder = (id: number) => {
		const order = SORT_ORDER_DATA.find((order) => order.id === id);

		if (!order) return;
		onChangeSortOrder(order.value);
	};

	return (
		<>
			<BaseFilterSection
				title={t(Tasks.SORT_ORDER_TITLE)}
				data={updatedSortOrderData}
				onClick={onChooseSortOrder}
			/>
		</>
	);
};
