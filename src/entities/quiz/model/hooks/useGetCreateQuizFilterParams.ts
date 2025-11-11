import { QuestionModeType } from '@/entities/quiz';

import { CreateQuizFilterParams } from '../types/filters';

export const useGetCreateQuizFilterParams = (initialParams: CreateQuizFilterParams) => {
	const params = new URLSearchParams(location.search);
	const parsedParams = Object.fromEntries(params.entries());

	const currentParams: CreateQuizFilterParams = {
		skills: parsedParams.skills ? parsedParams.skills.split(',').map(Number) : initialParams.skills,
		specialization: parsedParams.specialization
			? Number(parsedParams.specialization)
			: initialParams.specialization,
		complexity: parsedParams.complexity
			? parsedParams.complexity.split(',').map(Number)
			: initialParams.complexity,
		mode: (parsedParams.mode as QuestionModeType) || initialParams.mode,
		count: parsedParams.count ? Number(parsedParams.count) : initialParams.count,
	};

	return currentParams;
};
