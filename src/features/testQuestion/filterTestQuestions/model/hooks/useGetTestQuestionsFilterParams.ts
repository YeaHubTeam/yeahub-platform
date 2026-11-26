import { TestQuestionsFilterParams } from '../types/filters';

export const useGetTestQuestionsFilterParams = (initialParams: TestQuestionsFilterParams) => {
	const params = new URLSearchParams(location.search);
	const parsedParams = Object.fromEntries(params.entries());

	const currentParams: TestQuestionsFilterParams = {
		page: parsedParams.page ? Number(parsedParams.page) : initialParams.page,
		name: parsedParams.name || initialParams.name,
		isMy: parsedParams.isMy === 'true' ? true : initialParams.isMy,
		authorId: parsedParams.authorId || initialParams.authorId,
		specialization: parsedParams.specialization
			? Number(parsedParams.specialization)
			: initialParams.specialization,
		skills: parsedParams.skills ? parsedParams.skills.split(',').map(Number) : initialParams.skills,
		rate: parsedParams.rate ? parsedParams.rate.split(',').map(Number) : initialParams.rate,
		complexity: parsedParams.complexity
			? parsedParams.complexity.split(',').map(Number)
			: initialParams.complexity,
	};
	return currentParams;
};
