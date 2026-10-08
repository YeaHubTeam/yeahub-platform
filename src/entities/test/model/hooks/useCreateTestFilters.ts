import { useQueryFilterParams } from '@/shared/libs';

import { CreateTestFilterParams } from '../types/testTypes';

import { useGetCreateTestFilterParams } from './useGetCreateTestFilterParams';

export const useCreateTestFilters = (initialParams: CreateTestFilterParams) => {
	const currentParams = useGetCreateTestFilterParams(initialParams);
	const { filters, onFilterChange } = useQueryFilterParams<CreateTestFilterParams>(
		initialParams,
		currentParams,
	);

	const onChangeSkills = (skills: CreateTestFilterParams['skills']) => {
		onFilterChange({ skills });
	};

	const onChangeComplexity = (complexity: CreateTestFilterParams['complexity']) => {
		onFilterChange({ complexity });
	};

	const onChangeCount = (count: CreateTestFilterParams['count']) => {
		onFilterChange({ count });
	};

	const onChangeMode = (mode: CreateTestFilterParams['mode']) => {
		onFilterChange({ mode });
	};

	return {
		filters,
		onChangeSkills,
		onChangeComplexity,
		onChangeCount,
		onChangeMode,
	};
};
