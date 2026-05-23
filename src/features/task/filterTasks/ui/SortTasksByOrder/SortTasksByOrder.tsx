import { useTranslation } from 'react-i18next';
import { i18Namespace, Tasks } from '@/shared/config';
import { SORT_ORDER_DATA } from '../../model/constants/sort';
import { SortOrder } from '@/shared/libs';
import { SortFilterSection } from '@/shared/ui/SortFilterSection';
import prepareSortFilterData from '../../model/helpers/prepareSortFilterData';

interface SortTasksByOrderProps {
	value?: SortOrder;
	onChangeSortOrder: (sortOrder?: SortOrder) => void;
}

export const SortTasksByOrder = ({ onChangeSortOrder, value }: SortTasksByOrderProps) => {
	const { t } = useTranslation(i18Namespace.task);
	const preparedData = prepareSortFilterData({data: SORT_ORDER_DATA, value, t})

	return (
		<SortFilterSection
			title={t(Tasks.SORT_ORDER_TITLE)}
			onChange={onChangeSortOrder}
			data={preparedData}
			value={value}
		/>
	);
};
