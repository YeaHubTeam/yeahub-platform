import { useQueryFilterParams } from '@/shared/libs';

import { DEFAULT_CLIENT_TYPE } from '../constants/filters';
import type { FeatureFlagsFilterParams } from '../types/filters';

import { useGetFeatureFlagsFilterParams } from './useGetFeatureFlagsFilterParams';

export const useFeatureFlagsFilters = (initialParams: FeatureFlagsFilterParams) => {
	const currentParams = useGetFeatureFlagsFilterParams(initialParams);
	const { filters, onFilterChange, onResetFilters } =
		useQueryFilterParams<FeatureFlagsFilterParams>(initialParams, currentParams);

	const hasActiveFilters =
		(filters.roleIds ?? []).length > 0 ||
		filters.enabled !== undefined ||
		filters.clientType !== DEFAULT_CLIENT_TYPE;

	const hasFilters = hasActiveFilters || Boolean(filters.search) || (filters.page ?? 1) > 1;

	const onChangePage = (page: FeatureFlagsFilterParams['page']) => onFilterChange({ page });
	const onChangeSearch = (search: FeatureFlagsFilterParams['search']) =>
		onFilterChange({ search: search?.trim() || undefined, page: 1 });
	const onChangeRoleIds = (roleIds?: FeatureFlagsFilterParams['roleIds']) =>
		onFilterChange({ roleIds, page: 1 });
	const onChangeClientType = (clientType: FeatureFlagsFilterParams['clientType']) =>
		onFilterChange({ clientType, page: 1 });
	const onChangeEnabled = (enabled?: FeatureFlagsFilterParams['enabled']) =>
		onFilterChange({ enabled, page: 1 });

	return {
		filters,
		hasFilters,
		hasActiveFilters,
		onChangePage,
		onChangeSearch,
		onChangeRoleIds,
		onChangeClientType,
		onChangeEnabled,
		onResetFilters,
	};
};
