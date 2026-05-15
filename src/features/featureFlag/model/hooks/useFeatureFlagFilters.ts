import { useQueryFilterParams } from '@/shared/libs';

import { FeatureFlagFiltersParams } from '../types/filters';

import { useGetFeatureFlagFilterParams } from './useGetFeatureFlagFilterParams';

export const useFeatureFlagFilters = (initialParams: FeatureFlagFiltersParams) => {
	const currentParams = useGetFeatureFlagFilterParams(initialParams);
	const { filters, onFilterChange } = useQueryFilterParams<FeatureFlagFiltersParams>(
		initialParams,
		currentParams,
	);

	const hasFilters = filters.enabled || Boolean(filters.search);

	const onChangeSearch = (search: FeatureFlagFiltersParams['search']) => {
		onFilterChange({ search, page: 1 });
	};

	const onChangePage = (page: FeatureFlagFiltersParams['page']) => {
		onFilterChange({ page });
	};

	const onChangeIsEnabled = (enabled: FeatureFlagFiltersParams['enabled']) => {
		onFilterChange({ enabled, page: 1 });
	};

	const onChangeRoles = (selectedRoles?: FeatureFlagFiltersParams['selectedRoles']) => {
		onFilterChange({ selectedRoles, page: 1 });
	};

	return {
		filters,
		hasFilters,
		onChangePage,
		onChangeSearch,
		onChangeIsEnabled,
		onChangeRoles,
	};
};
