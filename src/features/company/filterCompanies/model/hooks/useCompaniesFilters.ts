import { useQueryFilterParams } from '@/shared/libs';

import { CompaniesFilterParams } from '../types/filters';

import { useGetCompaniesFilterParams } from './useGetCompaniesFilterParams';

export const useCompaniesFilters = (initialParams: CompaniesFilterParams) => {
	const currentParams = useGetCompaniesFilterParams(initialParams);
	const { filters, onFilterChange, onResetFilters } = useQueryFilterParams<CompaniesFilterParams>(
		initialParams,
		currentParams,
	);

	const hasDrawerFilters = Boolean(filters.authorId) || Boolean(filters.isMy);

	const hasFilters = hasDrawerFilters || Boolean(filters.title) || (filters.page || 1) > 1;

	const onChangeTitle = (title: CompaniesFilterParams['title']) => {
		onFilterChange({ title: title || undefined, page: 1 });
	};

	const onChangeIsMy = (isMy: CompaniesFilterParams['isMy']) => {
		onFilterChange({ isMy, authorId: undefined, page: 1 });
	};

	const onChangePage = (page: CompaniesFilterParams['page']) => {
		onFilterChange({ page });
	};

	const onChangeAuthor = (authorId?: CompaniesFilterParams['authorId']) => {
		onFilterChange({ authorId, page: 1 });
	};

	return {
		filters,
		hasFilters,
		hasDrawerFilters,
		onResetFilters,
		onChangeTitle,
		onChangePage,
		onChangeIsMy,
		onChangeAuthor,
	};
};
