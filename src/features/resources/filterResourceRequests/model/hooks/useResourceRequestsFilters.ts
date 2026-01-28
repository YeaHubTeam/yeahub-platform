import { useQueryFilterParams } from '@/shared/libs';

import { ResourceRequestsFilterParams } from '../types/filters';

import { useGetResourceRequestsFilterParams } from './useGetResourceRequestsFilterParams';

export const useResourceRequestsFilters = (initialParams: ResourceRequestsFilterParams) => {
	const currentParams = useGetResourceRequestsFilterParams(initialParams);
	const { filters, onFilterChange, onResetFilters } =
		useQueryFilterParams<ResourceRequestsFilterParams>(initialParams, currentParams);

	const hasFilters =
		(filters.page || 1) > 1 ||
		Boolean(filters.title) ||
		filters.status !== 'all' ||
		(filters?.skills || [])?.length > 0 ||
		(filters?.types || [])?.length > 0 ||
		filters.isMy === true;

	const onChangeTitle = (title: ResourceRequestsFilterParams['title']) => {
		onFilterChange({ title, page: 1 });
	};

	const onChangeTypes = (types: ResourceRequestsFilterParams['types']) => {
		onFilterChange({ types, page: 1 });
	};

	const onChangePage = (page: ResourceRequestsFilterParams['page']) => {
		onFilterChange({ page });
	};

	const onChangeStatus = (status: ResourceRequestsFilterParams['status']) => {
		onFilterChange({ status, page: 1 });
	};

	const onChangeSkills = (skills: ResourceRequestsFilterParams['skills']) => {
		onFilterChange({ skills, page: 1 });
	};

	const onChangeIsMy = (isMy: ResourceRequestsFilterParams['isMy']) => {
		onFilterChange({ isMy, page: 1 });
	};

	return {
		filters,
		hasFilters,
		onChangeTitle,
		onChangeTypes,
		onChangePage,
		onChangeStatus,
		onResetFilters,
		onChangeSkills,
		onChangeIsMy,
	};
};
