import { useTranslation } from 'react-i18next';

import { i18Namespace, Tasks } from '@/shared/config';
import { BaseFilterItem, BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { TaskFilterOrderBy } from '@/entities/task';

interface TaskSortByFieldFilterProps {
	onChangeSortBy: (sortBy?: TaskFilterOrderBy) => void;
	selectedSortBy?: TaskFilterOrderBy;
}

export const TaskSortByFieldFilter = ({
	onChangeSortBy,
	selectedSortBy,
}: TaskSortByFieldFilterProps) => {
	const { t } = useTranslation(i18Namespace.task);
	const field: BaseFilterItem<TaskFilterOrderBy>[] = [
		{ id: 'name', title:  t(Tasks.SORT_NAME) },
		{ id: 'createdAt', title: t(Tasks.SORT_CREATED_AT) },
	];
	const preparedData = field.map((item) => ({
		...item,
		active: selectedSortBy === item.id,
	}));

	const onChangeSort = (sortBy: TaskFilterOrderBy) => {
		onChangeSortBy(sortBy === selectedSortBy ? undefined : sortBy);
	};

	return (
		<BaseFilterSection title={t(Tasks.SORT_FIELD)} data={preparedData} onClick={onChangeSort} />
	);
};
