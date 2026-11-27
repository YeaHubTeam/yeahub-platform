import { useQueryFilterParams } from '@/shared/libs';

import { ResourcesFilterParams } from '../types/filters';

import { useGetResourcesFilterParams } from './useGetResourcesFilterParams';

export const useResourcesFilters = (initialParams: ResourcesFilterParams) => {
	const currentParams = useGetResourcesFilterParams(initialParams);

	const { filters, onFilterChange, onResetFilters } = useQueryFilterParams<ResourcesFilterParams>(
		initialParams,
		currentParams,
	);

	const hasDrawerFilters =
		Boolean(filters.types?.length) ||
		Boolean(filters.skills?.length) ||
		Boolean(filters.specialization) ||
		Boolean(filters.authorId) ||
		Boolean(filters.isMy);

	const hasFilters = hasDrawerFilters || Boolean(filters.title) || (filters.page || 1) > 1;

	const onChangeTitle = (title: ResourcesFilterParams['title']) => {
		onFilterChange({ title, page: 1 });
	};

	const onChangeSkills = (skills: ResourcesFilterParams['skills']) => {
		onFilterChange({ skills, page: 1 });
	};

	const onChangeAuthorId = (authorId: ResourcesFilterParams['authorId']) => {
		onFilterChange({ authorId, page: 1 });
	};

	const onChangeIsMy = (isMy: ResourcesFilterParams['isMy']) => {
		onFilterChange({
			isMy,
			authorId: undefined,
			page: 1,
		});
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
		onChangeAuthorId,
		onChangeIsMy,
		hasDrawerFilters,
	};
};
