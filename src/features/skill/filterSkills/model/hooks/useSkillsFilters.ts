import { useQueryFilterParams } from '@/shared/libs';

import { SkillsFilterParams } from '../types/filters';

import { useGetSkillsFilterParams } from './useGetSkillsFilterParams';

export const useSkillsFilters = (initialParams: SkillsFilterParams) => {
	const currentParams = useGetSkillsFilterParams(initialParams);
	const { filters, onFilterChange, onResetFilters } = useQueryFilterParams<SkillsFilterParams>(
		initialParams,
		currentParams,
	);

	const hasFilters =
		(filters.page || 1) > 1 ||
		Boolean(filters.title) ||
		Boolean(filters.specialization) ||
		filters.isMy;

	const onChangeTitle = (title: SkillsFilterParams['title']) => {
		onFilterChange({ title, page: 1 });
	};

	const onChangePage = (page: SkillsFilterParams['page']) => {
		onFilterChange({ page });
	};

	const onChangeSpecialization = (specialization?: SkillsFilterParams['specialization']) => {
		onFilterChange({ specialization, page: 1 });
	};

	const onChangeIsMy = (isMy: SkillsFilterParams['isMy']) => {
		onFilterChange({ isMy, page: 1 });
	};

	return {
		filters,
		hasFilters,
		onResetFilters,
		onChangeTitle,
		onChangeSpecialization,
		onChangePage,
		onChangeIsMy,
	};
};
