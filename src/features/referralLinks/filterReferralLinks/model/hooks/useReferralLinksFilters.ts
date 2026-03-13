import { useQueryFilterParams } from '@/shared/libs';

import { ReferralLinksFilterParams } from '../types/filters';

import { useGetReferralLinksFilterParams } from './useGetReferralLinksFilterParams';

export const useReferralLinksFilters = (initialParams: ReferralLinksFilterParams) => {
	const currentParams = useGetReferralLinksFilterParams(initialParams);
	const { filters, onFilterChange, onResetFilters } =
		useQueryFilterParams<ReferralLinksFilterParams>(initialParams, currentParams);

	const hasFilters = (filters.page || 1) > 1;

	const onChangePage = (page: ReferralLinksFilterParams['page']) => {
		onFilterChange({ page });
	};

	return {
		filters,
		hasFilters,
		onResetFilters,
		onChangePage,
	};
};
