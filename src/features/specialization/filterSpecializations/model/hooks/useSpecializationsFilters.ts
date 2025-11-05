import { useQueryFilterParams } from '@/shared/hooks';

import { SpecializationsFilterParams } from '../types/filters';

import { useGetSpecializationsFilterParams } from './useGetSpecializationsFilterParams';

export const useSpecializationsFilters = (initialParams: SpecializationsFilterParams) => {
	const currentParams = useGetSpecializationsFilterParams(initialParams);
	const { filters, onFilterChange, onResetFilters } =
		useQueryFilterParams<SpecializationsFilterParams>(initialParams, currentParams);

	const hasFilters = (filters.page || 1) > 1 || Boolean(filters.title) || Boolean(filters.author);

	const onChangeTitle = (title: SpecializationsFilterParams['title']) => {
		onFilterChange({ title, page: 1 });
	};

	const onChangePage = (page: SpecializationsFilterParams['page']) => {
		onFilterChange({ page });
	};

	const onChangeAuthor = (author?: SpecializationsFilterParams['author']) => {
		onFilterChange({ author, page: 1 });
	};

	return {
		filters,
		hasFilters,
		onResetFilters,
		onChangeTitle,
		onChangeAuthor,
		onChangePage,
	};
};
