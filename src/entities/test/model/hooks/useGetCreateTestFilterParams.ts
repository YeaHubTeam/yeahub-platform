import { CreateTestFilterParams, TestMode } from '../types/testTypes';

const TEST_MODES: TestMode[] = ['REPEAT', 'NEW', 'RANDOM'];

const parseNumberList = (value?: string) => {
	if (!value) return undefined;

	const numbers = value.split(',').map(Number).filter(Number.isFinite);

	return numbers.length > 0 ? numbers : undefined;
};

const parseMode = (value: string | undefined, fallback?: TestMode) => {
	return TEST_MODES.includes(value as TestMode) ? (value as TestMode) : fallback;
};

export const useGetCreateTestFilterParams = (initialParams: CreateTestFilterParams) => {
	const params = new URLSearchParams(location.search);
	const parsedParams = Object.fromEntries(params.entries());
	const parsedCount = Number(parsedParams.count);

	const currentParams: CreateTestFilterParams = {
		skills: parseNumberList(parsedParams.skills) ?? initialParams.skills,
		complexity: parseNumberList(parsedParams.complexity) ?? initialParams.complexity,
		mode: parseMode(parsedParams.mode, initialParams.mode),
		count: Number.isInteger(parsedCount) && parsedCount > 0 ? parsedCount : initialParams.count,
	};

	return currentParams;
};
