import { useQueryFilterParams } from '@/shared/libs';

import { TestQuestionsFilterParams } from '../types/filters';

import { useGetTestQuestionsFilterParams } from './useGetTestQuestionsFilterParams';

export const useTestQuestionsFilters = (initialParams: TestQuestionsFilterParams) => {
	const currentParams = useGetTestQuestionsFilterParams(initialParams);
	const { filters, onFilterChange, onResetFilters } =
		useQueryFilterParams<TestQuestionsFilterParams>(initialParams, currentParams);

	const hasFilters =
		(filters.page || 1) > 1 ||
		Boolean(filters.name) ||
		Boolean(filters.authorId) ||
		Boolean(filters.specialization) ||
		(filters.skills || []).length > 0 ||
		(filters.rate || []).length > 0 ||
		(filters.complexity || []).length > 0 ||
		filters.isMy;

	const onChangeName = (name: TestQuestionsFilterParams['name']) => {
		onFilterChange({ name, page: 1 });
	};

	const onChangePage = (page: TestQuestionsFilterParams['page']) => {
		onFilterChange({ page });
	};

	const onChangeSpecialization = (specialization?: TestQuestionsFilterParams['specialization']) => {
		onFilterChange({
			specialization,
			skills: undefined,
			page: 1,
		});
	};

	const onChangeSkills = (skills?: TestQuestionsFilterParams['skills']) => {
		onFilterChange({ skills, page: 1 });
	};

	const onChangeComplexity = (complexity?: TestQuestionsFilterParams['complexity']) => {
		onFilterChange({ complexity, page: 1 });
	};

	const onChangeRate = (rate?: TestQuestionsFilterParams['rate']) => {
		onFilterChange({ rate, page: 1 });
	};

	const onChangeIsMy = (isMy?: TestQuestionsFilterParams['isMy']) => {
		onFilterChange({ isMy, page: 1, authorId: undefined });
	};

	const onChangeAuthorId = (authorId?: TestQuestionsFilterParams['authorId']) => {
		onFilterChange({ authorId, page: 1 });
	};

	return {
		filters,
		hasFilters,
		onResetFilters,
		onChangeName,
		onChangePage,
		onChangeSpecialization,
		onChangeSkills,
		onChangeComplexity,
		onChangeRate,
		onChangeIsMy,
		onChangeAuthorId,
	};
};
