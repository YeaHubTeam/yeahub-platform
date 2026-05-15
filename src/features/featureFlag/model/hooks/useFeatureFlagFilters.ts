import { useQueryFilterParams } from '@/shared/libs';

import { GetFeatureFlagsListParamsRequest } from '@/entities/featureFlag';

import { useGetFeatureFlagFilterParams } from './useGetFeatureFlagFilterParams';

export const useFeatureFlagFilters = (initialParams: GetFeatureFlagsListParamsRequest) => {
	const currentParams = useGetFeatureFlagFilterParams(initialParams);
	const { filters, onFilterChange } = useQueryFilterParams<GetFeatureFlagsListParamsRequest>(
		initialParams,
		currentParams,
	);

	const hasFilters = filters.enabled || Boolean(filters.search);

	const onChangeSearch = (search: GetFeatureFlagsListParamsRequest['search']) => {
		onFilterChange({ search, page: 1 });
	};

	const onChangePage = (page: GetFeatureFlagsListParamsRequest['page']) => {
		onFilterChange({ page });
	};

	const onChangeIsEnabled = (enabled: GetFeatureFlagsListParamsRequest['enabled']) => {
		onFilterChange({ enabled, page: 1 });
	};

	return {
		filters,
		hasFilters,
		onChangePage,
		onChangeSearch,
		onChangeIsEnabled,
	};
};
