import { useTranslation } from 'react-i18next';
import { i18Namespace, Tasks } from '@/shared/config';
import { SORT_FIELDS_DATA } from '../../model/constants/sort';
import { SortBy } from '@/shared/libs/app/types';
import { SortFilterSection } from '@/shared/ui/SortFilterSection';
import prepareSortFilterData from '../../model/helpers/prepareSortFilterData';

interface SortTasksFieldProps {
	value?: SortBy;
	onChangeSortField: (field?: SortBy) => void;
}

export const SortTasksByField = ({ onChangeSortField, value }: SortTasksFieldProps) => {
	const { t } = useTranslation(i18Namespace.task);
	const preparedData = prepareSortFilterData({data: SORT_FIELDS_DATA, value, t})

	return (
		<SortFilterSection
			title={t(Tasks.SORT_FIELDS_TITLE)}
			data={preparedData}
			onChange={onChangeSortField}
			value={value}
		/>
	);
};
