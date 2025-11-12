import { useQueryFilterParams } from '@/shared/hooks';

import { ResourcesFilterParams } from '../types/filters';

import { useGetResourcesFilterParams } from './useGetResourcesFilterParams';

export const useResourcesFilters = (initialParams: ResourcesFilterParams) => {
	const currentParams = useGetResourcesFilterParams(initialParams);

	const { filters, onFilterChange, onResetFilters } = useQueryFilterParams<ResourcesFilterParams>(
		initialParams,
		currentParams,
	);

	const hasFilters =
		(filters.page || 1) > 1 ||
		Boolean(filters.title) ||
		(filters?.types || [])?.length > 0 ||
		(filters.skills || [])?.length > 0 ||
		Boolean(filters.specialization);

	const onChangeTitle = (title: ResourcesFilterParams['title']) => {
		onFilterChange({ title, page: 1 });
	};

	const onChangeSkills = (skills: ResourcesFilterParams['skills']) => {
		onFilterChange({ skills, page: 1 });
	};

	const onChangeSpecialization = (specialization: ResourcesFilterParams['specialization']) => {
		onFilterChange({
			specialization,
			skills: undefined,
			page: 1,
		});
	};

	const onChangeTypes = (types: ResourcesFilterParams['types']) => {
		onFilterChange({ types, page: 1 });
	};

	const onChangePage = (page: ResourcesFilterParams['page']) => {
		onFilterChange({ page });
	};

	return {
		filters,
		hasFilters,
		onChangeTitle,
		onChangeSkills,
		onChangeTypes,
		onChangeSpecialization,
		onChangePage,
		onResetFilters,
	};
};
