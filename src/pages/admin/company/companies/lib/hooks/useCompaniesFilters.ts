import { useQueryFilterParams } from '@/shared/libs';

import { CompaniesFilterParams } from '../../model/types/filters';

import { useGetCompaniesFilterParams } from './useGetCompaniesFilterParams';

export const useCompaniesFilters = (initialParams: CompaniesFilterParams) => {
	const currentParams = useGetCompaniesFilterParams(initialParams);
	const { filters, onFilterChange, onResetFilters } = useQueryFilterParams<CompaniesFilterParams>(
		initialParams,
		currentParams,
	);

	const hasFilters = (filters.page || 1) > 1 || Boolean(filters.title);

	const onChangeTitle = (title: CompaniesFilterParams['title']) => {
		onFilterChange({ title, page: 1 });
	};

	const onChangePage = (page: CompaniesFilterParams['page']) => {
		onFilterChange({ page });
	};

	return {
		filters,
		hasFilters,
		onResetFilters,
		onChangeTitle,
		onChangePage,
	};
};
