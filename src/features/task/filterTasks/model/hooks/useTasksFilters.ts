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
		Boolean(filters.companyId) ||
		(filters.langIds || []).length > 0;

	const onChangePage = (page: TasksFilterParams['page']) => {
		onFilterChange({ page });
	};

	const onChangeTitle = (title: TasksFilterParams['title']) => {
		const normalized = title?.trim();
		onFilterChange({ title: normalized?.length ? normalized : undefined });
	};

	const onChangeDifficulty = (difficulty: TasksFilterParams['difficulty']) => {
		onFilterChange({ difficulty });
	};

	const onChangeCategory = (category: TasksFilterParams['category']) => {
		onFilterChange({ category });
	};

	const onChangeCompanyId = (companyId: TasksFilterParams['companyId']) => {
		onFilterChange({ companyId });
	};

	const onChangeLangIds = (langIds?: TasksFilterParams['langIds']) => {
		onFilterChange({ langIds });
	};

	return {
		filters,
		hasFilters,
		onChangePage,
		onChangeTitle,
		onChangeDifficulty,
		onChangeLangIds,
		onChangeCategory,
		onChangeCompanyId,
		onResetFilters,
	};
};
