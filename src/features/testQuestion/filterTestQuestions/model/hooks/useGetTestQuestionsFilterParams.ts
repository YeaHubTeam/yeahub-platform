import { useLocation } from 'react-router-dom';

import { TestQuestionsFilterParams } from '../types/filters';

const parsePositiveInteger = (value: string | null) => {
	if (!value?.trim()) return undefined;
	const number = Number(value);
	return Number.isSafeInteger(number) && number > 0 ? number : undefined;
};

const parseNumberList = (value: string | null, max = Number.MAX_SAFE_INTEGER) => {
	if (value === null) return undefined;
	const numbers = value
		.split(',')
		.map((item) => parsePositiveInteger(item))
		.filter((item): item is number => item !== undefined && item <= max);
	return numbers.length ? [...new Set(numbers)] : undefined;
};

export const useGetTestQuestionsFilterParams = (initialParams: TestQuestionsFilterParams) => {
	const { search } = useLocation();
	const params = new URLSearchParams(search);
	const rawIsMy = params.get('isMy');
	const isMy = rawIsMy === 'true' ? true : rawIsMy === 'false' ? false : initialParams.isMy;

	const currentParams: TestQuestionsFilterParams = {
		page: parsePositiveInteger(params.get('page')) ?? initialParams.page,
		isMy,
		authorId: isMy ? undefined : params.get('authorId') || initialParams.authorId,
		specialization:
			parsePositiveInteger(params.get('specialization')) ?? initialParams.specialization,
		skills: params.has('skills') ? parseNumberList(params.get('skills')) : initialParams.skills,
		complexity: params.has('complexity')
			? parseNumberList(params.get('complexity'), 10)
			: initialParams.complexity,
		rate: params.has('rate') ? parseNumberList(params.get('rate'), 5) : initialParams.rate,
	};

	return currentParams;
};
