import { SortOrder } from '@/shared/libs';

import {
	QuestionFilterOrderBy,
	QuestionFilterStatus,
	QuestionsFilterParams,
} from '@/entities/question';

const isQuestionFilterOrderBy = (value?: string): value is QuestionFilterOrderBy => {
	return value === 'title' || value === 'complexity' || value === 'rate';
};

const isSortOrder = (value?: string): value is SortOrder => {
	return value === 'ASC' || value === 'DESC';
};

export const useGetQuestionsFilterParams = (initialParams: QuestionsFilterParams) => {
	const params = new URLSearchParams(location.search);
	const parsedParams = Object.fromEntries(params.entries());

	const currentParams: QuestionsFilterParams = {
		page: parsedParams.page ? Number(parsedParams.page) : initialParams.page,
		specialization: parsedParams.specialization
			? Number(parsedParams.specialization)
			: initialParams.specialization,
		authorId: parsedParams.authorId || initialParams.authorId,
		title: parsedParams.title || initialParams.title,
		skills: parsedParams.skills ? parsedParams.skills.split(',').map(Number) : initialParams.skills,
		status: (parsedParams.status as QuestionFilterStatus) || initialParams.status,
		rate: parsedParams.rate ? parsedParams.rate.split(',').map(Number) : initialParams.rate,
		complexity: parsedParams.complexity
			? parsedParams.complexity.split(',').map(Number)
			: initialParams.complexity,
		orderBy: isQuestionFilterOrderBy(parsedParams.orderBy)
			? parsedParams.orderBy
			: initialParams.orderBy,
		order: isSortOrder(parsedParams.order) ? parsedParams.order : initialParams.order,
	};

	return currentParams;
};
