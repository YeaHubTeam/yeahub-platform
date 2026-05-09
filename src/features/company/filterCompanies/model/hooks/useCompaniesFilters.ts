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
		Boolean(filters.author) ||
		Boolean(filters.isMy);

	const onChangeTitle = (title: CompaniesFilterParams['title']) => {
		onFilterChange({ title, page: 1 });
	};
	const onChangeIsMy = (isMy: CompaniesFilterParams['isMy']) => {
		onFilterChange({ isMy, author: isMy ? undefined : filters.author, page: 1 });
	};
	const onChangePage = (page: CompaniesFilterParams['page']) => {
		onFilterChange({ page });
	};

	const onChangeAuthor = (author?: CompaniesFilterParams['author']) => {
		onFilterChange({ author, isMy: false, page: 1 });
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
