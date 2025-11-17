import { useQueryFilterParams } from '@/shared/hooks';

import { AnalyticFilterParams } from '../types/types';

import { useGetAnalyticFilterParams } from './useGetAnalyticFilterParams';

export const useAnalyticFilters = (initialParams: AnalyticFilterParams) => {
	const currentParams = useGetAnalyticFilterParams(initialParams);
	const { filters, onFilterChange, onResetFilters } = useQueryFilterParams<AnalyticFilterParams>(
		initialParams,
		currentParams,
	);

	const hasFilters =
		(filters.page || 1) > 1 || Boolean(filters.skill) || Boolean(filters.specialization);

	const onChangeSpecialization = (specialization: AnalyticFilterParams['specialization']) => {
		console.log(specialization);
		onFilterChange({
			specialization,
			skill: undefined,
			page: 1,
		});
	};

	const onChangeSkill = (skill: AnalyticFilterParams['skill']) => {
		onFilterChange({
			skill,
			page: 1,
			specialization: filters.specialization,
		});
	};

	const onChangePage = (page: AnalyticFilterParams['page']) => {
		onFilterChange({ page, specialization: filters.specialization });
	};

	return {
		filters,
		hasFilters,
		onResetFilters,
		onChangeSkill,
		onChangeSpecialization,
		onChangePage,
	};
};
