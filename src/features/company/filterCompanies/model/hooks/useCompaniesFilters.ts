import { useQueryFilterParams } from '@/shared/libs';

import { CompaniesFilterParams } from '../types/filters';

import { useGetCompaniesFilterParams } from './useGetCompaniesFilterParams';

export const useCompaniesFilters = (initialParams: CompaniesFilterParams) => {
	const currentParams = useGetCompaniesFilterParams(initialParams);
	const { filters, onFilterChange, onResetFilters } = useQueryFilterParams<CompaniesFilterParams>(
		initialParams,
		currentParams,
	);

	const hasFilters =
		(filters.page || 1) > 1 ||
		Boolean(filters.title) ||
		Boolean(filters.authorId) ||
		Boolean(filters.isMy);

	const onChangeTitle = (title: CompaniesFilterParams['title']) => {
		onFilterChange({ title, page: 1 });
	};

	const onChangeIsMy = (isMy: CompaniesFilterParams['isMy']) => {
		onFilterChange({ isMy, authorId: isMy ? undefined : filters.authorId, page: 1 });
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
		onResetFilters,
		onChangeTitle,
		onChangePage,
		onChangeIsMy,
		onChangeAuthor,
	};
};
