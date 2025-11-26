import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { SortOrder } from '@/shared/types/types';
import { BaseFilterItem, BaseFilterSection } from '@/shared/ui/BaseFilterSection';

interface OrderFilterProps {
	changeOrder: (order?: SortOrder) => void;
	selectedOrder?: string;
}

export const OrderFilter = ({ changeOrder, selectedOrder }: OrderFilterProps) => {
	const { t } = useTranslation(i18Namespace.translation);

	const field: BaseFilterItem<SortOrder>[] = [
		{ id: 'ASC', title: t(Translation.SORT_ASCENDING) },
		{ id: 'DESC', title: t(Translation.SORT_DESCENDING) },
	];

	const preparedData = field.map((item) => ({
		...item,
		active: selectedOrder === item.id,
	}));

	const onChangeOrder = (order: SortOrder) => {
		changeOrder(order === selectedOrder ? undefined : order);
	};

	return (
		<BaseFilterSection
			data={preparedData}
			title={t(Translation.SORT_TITLE)}
			onClick={onChangeOrder}
		/>
	);
};
