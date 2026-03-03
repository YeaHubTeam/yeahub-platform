import { useQueryFilterParams } from '@/shared/libs';
import { ReferralsFilterParams } from '../types/filters';
import { useGetReferralsFilterParams } from './useGetReferralsFilterParams';

export const useReferralsFilters = (initialParams: ReferralsFilterParams) => {
	const currentParams = useGetReferralsFilterParams(initialParams);
	const { filters, onFilterChange, onResetFilters } = useQueryFilterParams<ReferralsFilterParams>(
		initialParams,
		currentParams,
	);

	const hasFilters = (filters.page || 1) > 1;

	const onChangePage = (page: ReferralsFilterParams['page']) => {
		onFilterChange({ page });
	};

	return {
		filters,
		hasFilters,
		onResetFilters,
		onChangePage,
	};
};
