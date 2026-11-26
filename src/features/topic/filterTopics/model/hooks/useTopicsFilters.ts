import { useQueryFilterParams } from '@/shared/libs';

import { TopicsFilterParams } from '../types/filters';

import { useGetTopicsFilterParams } from './useGetTopicsFilterParams';

export const useTopicsFilters = (initialParams: TopicsFilterParams) => {
	const currentParams = useGetTopicsFilterParams(initialParams);
	const { filters, onFilterChange, onResetFilters } = useQueryFilterParams<TopicsFilterParams>(
		initialParams,
		currentParams,
	);

	const hasFilters =
		(filters.page || 1) > 1 || Boolean(filters.title) || Boolean(filters.skillIds?.length);

	const onChangeTitle = (title: TopicsFilterParams['title']) => {
		onFilterChange({ title: title || undefined, page: 1 });
	};

	const onChangePage = (page: TopicsFilterParams['page']) => {
		onFilterChange({ page });
	};

	const onChangeSkills = (skillIds?: TopicsFilterParams['skillIds']) => {
		onFilterChange({ skillIds: skillIds?.length ? skillIds : undefined, page: 1 });
	};

	return {
		filters,
		hasFilters,
		onResetFilters,
		onChangeTitle,
		onChangePage,
		onChangeSkills,
	};
};
