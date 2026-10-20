import { useQueryFilterParams } from '@/shared/libs';

import { ArticlesFilterParams } from '@/entities/article';

import { useGetArticlesFilterParams } from './useGetArticlesFilterParams';

export const useArticlesFilters = (initialParams: ArticlesFilterParams) => {
	const currentParams = useGetArticlesFilterParams(initialParams);
	const { filters, onFilterChange } = useQueryFilterParams<ArticlesFilterParams>(
		initialParams,
		currentParams,
	);

	const onChangePage = (page: ArticlesFilterParams['page']) => {
		onFilterChange({ page });
	};

	return {
		filters,
		onChangePage,
	};
};
