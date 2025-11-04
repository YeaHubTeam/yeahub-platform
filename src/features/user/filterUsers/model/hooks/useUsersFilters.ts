import { useQueryFilterParams } from '@/shared/hooks';

import { UsersFilterParams } from '../types/filters';

import { useGetUsersFilterParams } from './useGetUsersFilterParams';

export const useUsersFilters = (initialParams: UsersFilterParams) => {
	const currentParams = useGetUsersFilterParams(initialParams);
	const { filters, onFilterChange, onResetFilters } = useQueryFilterParams<UsersFilterParams>(
		initialParams,
		currentParams,
	);

	const hasFilters =
		(filters.page || 1) > 1 ||
		Boolean(filters.search) ||
		Boolean(filters.isVerified) ||
		(filters.roles || []).length > 0;

	const onChangeSearch = (search: UsersFilterParams['search']) => {
		onFilterChange({ search, page: 1 });
	};

	const onChangePage = (page: UsersFilterParams['page']) => {
		onFilterChange({ page });
	};

	const onChangeIsVerified = (isVerified?: UsersFilterParams['isVerified']) => {
		onFilterChange({ isVerified, page: 1 });
	};

	const onChangeRoles = (roles?: UsersFilterParams['roles']) => {
		onFilterChange({ roles, page: 1 });
	};

	return {
		filters,
		hasFilters,
		onResetFilters,
		onChangeSearch,
		onChangeIsVerified,
		onChangePage,
		onChangeRoles,
	};
};
