import { useQueryFilterParams } from '@/shared/libs';

import { TopicsFilterParams } from '../../model/types/filters';

import { useGetTopicsFilterParams } from './useGetTopicsFilterParams';

export const useTopicsFilters = (initialParams: TopicsFilterParams) => {
	const currentParams = useGetTopicsFilterParams(initialParams);
	const { filters, onFilterChange, onResetFilters } = useQueryFilterParams<TopicsFilterParams>(
		initialParams,
		currentParams,
	);

	const hasFilters =
		(filters.page || 1) > 1 || Boolean(filters.title) || (filters.skillIds || []).length > 0;

	const onChangeTitle = (title: TopicsFilterParams['title']) => {
		onFilterChange({ title, page: 1 });
	};

	const onChangeSkillIds = (skillIds: TopicsFilterParams['skillIds']) => {
		onFilterChange({ skillIds, page: 1 });
	};

	const onChangePage = (page: TopicsFilterParams['page']) => {
		onFilterChange({ page });
	};

	return {
		filters,
		hasFilters,
		onResetFilters,
		onChangeTitle,
		onChangeSkillIds,
		onChangePage,
	};
};
