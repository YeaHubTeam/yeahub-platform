import { useTranslation } from 'react-i18next';

import { i18Namespace, Tasks } from '@/shared/config';
import { BaseFilterItem, BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { TaskFilterOrderBy } from '@/entities/task';

interface SortTasksFieldProps {
	selectedOrderBy?: TaskFilterOrderBy;
	onChangeSortField: (field?: TaskFilterOrderBy) => void;
}

export const SortTasksByField = ({ onChangeSortField, selectedOrderBy }: SortTasksFieldProps) => {
	const { t } = useTranslation(i18Namespace.task);

	const field: BaseFilterItem<TaskFilterOrderBy>[] = [
		{ id: 'name', title: t(Tasks.SORT_FIELDS_NAME) },
		{ id: 'difficulty', title: t(Tasks.SORT_DIFFICULTY) },
		{ id: 'createdAt', title: t(Tasks.SORT_CREATED_AT) },
	];

	const preparedData = field.map((item) => ({
		...item,
		active: selectedOrderBy === item.id,
	}));

	const onChangeOrder = (orderBy: TaskFilterOrderBy) => {
		onChangeSortField(orderBy === selectedOrderBy ? undefined : orderBy);
	};

	return (
		<BaseFilterSection
			title={t(Tasks.SORT_FIELDS_TITLE)}
			data={preparedData}
			onClick={onChangeOrder}
		/>
	);
};
