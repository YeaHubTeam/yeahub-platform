import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { i18Namespace, Tasks } from '@/shared/config';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { SORT_FIELDS_DATA } from '../../model/constants/sort';

interface SortTasksFieldProps {
	onChangeSortField: (field?: string) => void;
}

export const SortTasksByField = ({ onChangeSortField }: SortTasksFieldProps) => {
	const { t } = useTranslation(i18Namespace.task);
	const [searchParams] = useSearchParams();
	const currentSort = searchParams?.get('sortBy');

	const updatedFieldsData = SORT_FIELDS_DATA.map((field) => ({
		...field,
		title: t(field.label),
		active: currentSort === field.value,
	}));

	const onChooseField = (id: number) => {
		const selectedField = SORT_FIELDS_DATA.find((field) => field.id === id);

		if (!selectedField) return;
		onChangeSortField(selectedField?.value);
	};

	return (
		<>
			<BaseFilterSection
				title={t(Tasks.SORT_FIELDS_TITLE)}
				data={updatedFieldsData}
				onClick={onChooseField}
			/>
		</>
	);
};
