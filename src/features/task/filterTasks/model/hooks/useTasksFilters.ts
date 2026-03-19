import { useQueryFilterParams } from '@/shared/libs';

import type { TasksFilterParams } from '@/entities/task';

import { useGetTasksFilterParams } from './useGetTasksFilterParams';

export const useTasksFilters = (initialParams: TasksFilterParams) => {
	const currentParams = useGetTasksFilterParams(initialParams);

	const { filters, onFilterChange, onResetFilters } = useQueryFilterParams<TasksFilterParams>(
		initialParams,
		currentParams,
	);

	const hasFilters =
		(filters.page || 1) > 1 ||
		Boolean(filters.title) ||
		Boolean(filters.difficulty) ||
		Boolean(filters.category) ||
		(filters.langIds || []).length > 0;

	const onChangePage = (page: TasksFilterParams['page']) => {
		onFilterChange({ page });
	};

	const onChangeTitle = (title: TasksFilterParams['title']) => {
		const normalized = title?.trim();
		onFilterChange({ title: normalized?.length ? normalized : undefined, page: 1 });
	};

	const onChangeDifficulty = (difficulty: TasksFilterParams['difficulty']) => {
		onFilterChange({ difficulty, page: 1 });
	};

	const onChangeCategory = (category: TasksFilterParams['category']) => {
		onFilterChange({ category, page: 1 });
	};

	const onChangeLangIds = (langIds?: TasksFilterParams['langIds']) => {
		onFilterChange({ langIds, page: 1 });
	};

	return {
		filters,
		hasFilters,
		onChangePage,
		onChangeTitle,
		onChangeDifficulty,
		onChangeLangIds,
		onChangeCategory,
		onResetFilters,
	};
};
