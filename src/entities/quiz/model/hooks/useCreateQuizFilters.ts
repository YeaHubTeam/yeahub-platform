import { useQueryFilterParams } from '@/shared/libs';

import { CreateQuizFilterParams } from '../types/filters';

import { useGetCreateQuizFilterParams } from './useGetCreateQuizFilterParams';

export const useCreateQuizFilters = (initialParams: CreateQuizFilterParams) => {
	const currentParams = useGetCreateQuizFilterParams(initialParams);
	const { filters, onFilterChange } = useQueryFilterParams<CreateQuizFilterParams>(
		initialParams,
		currentParams,
	);

	const onChangeSpecialization = (specialization: CreateQuizFilterParams['specialization']) => {
		onFilterChange({
			specialization,
			skills: undefined,
		});
	};

	const onChangeSkills = (skills: CreateQuizFilterParams['skills']) => {
		onFilterChange({
			skills,
		});
	};

	const onChangeComplexity = (complexity?: CreateQuizFilterParams['complexity']) => {
		onFilterChange({ complexity });
	};

	const onChangeCount = (count: CreateQuizFilterParams['count']) => {
		onFilterChange({ count });
	};

	const onChangeMode = (mode: CreateQuizFilterParams['mode']) => {
		onFilterChange({ mode });
	};

	return {
		filters,
		onChangeSpecialization,
		onChangeSkills,
		onChangeComplexity,
		onChangeCount,
		onChangeMode,
	};
};
