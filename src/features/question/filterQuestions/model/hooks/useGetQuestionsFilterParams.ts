import { QuestionFilterStatus, QuestionsFilterParams } from '../types/filters';

export const useGetQuestionsFilterParams = (initialParams: QuestionsFilterParams) => {
	const params = new URLSearchParams(location.search);
	const parsedParams = Object.fromEntries(params.entries());

	const currentParams: QuestionsFilterParams = {
		page: parsedParams.page ? Number(parsedParams.page) : initialParams.page,
		specialization: parsedParams.specialization
			? Number(parsedParams.specialization)
			: initialParams.specialization,
		title: parsedParams.title || initialParams.title,
		skills: parsedParams.skills ? parsedParams.skills.split(',').map(Number) : initialParams.skills,
		status: (parsedParams.status as QuestionFilterStatus) || initialParams.status,
		rate: parsedParams.rate ? parsedParams.rate.split(',').map(Number) : initialParams.rate,
		complexity: parsedParams.complexity
			? parsedParams.complexity.split(',').map(Number)
			: initialParams.complexity,
	};

	return currentParams;
};
