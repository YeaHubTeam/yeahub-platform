import { useQueryFilterParams } from '@/shared/hooks';

import { QuestionsFilterParams } from '../types/filters';

import { useGetQuestionsFilterParams } from './useGetQuestionsFilterParams';

export const useQuestionsFilters = (initialParams: QuestionsFilterParams) => {
	const currentParams = useGetQuestionsFilterParams(initialParams);
	const { filters, onFilterChange, onResetFilters } = useQueryFilterParams<QuestionsFilterParams>(
		initialParams,
		currentParams,
	);

	const hasFilters =
		(filters.page || 1) > 1 ||
		Boolean(filters.title) ||
		Boolean(filters.specialization) ||
		(filters.skills || []).length > 0 ||
		(filters.rate || []).length > 0 ||
		(filters.complexity || []).length > 0 ||
		(filters.status && filters.status !== 'all') ||
		filters.isMy ||
		Boolean(filters.orderBy) ||
		Boolean(filters.order);

	const onChangeTitle = (title: QuestionsFilterParams['title']) => {
		onFilterChange({ title, page: 1 });
	};

	const onChangeSpecialization = (specialization: QuestionsFilterParams['specialization']) => {
		onFilterChange({
			specialization,
			skills: undefined,
			page: 1,
		});
	};

	const onChangeSkills = (skills: QuestionsFilterParams['skills']) => {
		onFilterChange({
			skills,
			page: 1,
		});
	};

	const onChangePage = (page: QuestionsFilterParams['page']) => {
		onFilterChange({ page });
	};

	const onChangeComplexity = (complexity?: QuestionsFilterParams['complexity']) => {
		onFilterChange({ complexity, page: 1 });
	};

	const onChangeRate = (rate: QuestionsFilterParams['rate']) => {
		onFilterChange({ rate, page: 1 });
	};

	const onChangeStatus = (status: QuestionsFilterParams['status']) => {
		onFilterChange({ status, page: 1 });
	};

	const onChangeIsMy = (isMy: QuestionsFilterParams['isMy']) => {
		onFilterChange({ isMy, page: 1 });
	};

	const onChangeOrder = (order: QuestionsFilterParams['order']) => {
		onFilterChange({ order, page: 1 });
	};

	const onChangeOrderBy = (orderBy: QuestionsFilterParams['orderBy']) => {
		onFilterChange({ orderBy, page: 1 });
	};

	return {
		filters,
		hasFilters,
		onResetFilters,
		onChangeTitle,
		onChangeSpecialization,
		onChangePage,
		onChangeSkills,
		onChangeComplexity,
		onChangeRate,
		onChangeStatus,
		onChangeIsMy,
		onChangeOrder,
		onChangeOrderBy,
	};
};
