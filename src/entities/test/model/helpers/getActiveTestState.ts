import { getJSONFromLS } from '@/shared/libs';

import { LS_ACTIVE_TESTS_KEY } from '../constants/testConstants';
import { CreateNewTestResponse, StoredTestAnswer } from '../types/testTypes';

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null && !Array.isArray(value);

export const getStoredActiveTest = (profileId: string): unknown => {
	const tests: unknown = getJSONFromLS(LS_ACTIVE_TESTS_KEY);
	return isRecord(tests) ? tests[profileId] : undefined;
};

export const getActiveTestState = (
	test: CreateNewTestResponse,
	savedTest?: unknown,
): StoredTestAnswer[] => {
	const savedQuestions = Array.isArray(savedTest) ? savedTest.filter(isRecord) : [];

	return test.questions.map((question) => {
		const savedQuestion = savedQuestions.find(
			(saved) => saved.testId === test.id && saved.questionId === question.id,
		);
		const variants = question.variants ?? {};
		const savedVariants = savedQuestion?.variants;
		const answer = Array.isArray(savedQuestion?.answer)
			? savedQuestion.answer.filter(
					(key): key is string =>
						typeof key === 'string' &&
						Object.hasOwn(variants, key) &&
						isRecord(savedVariants) &&
						savedVariants[key] === variants[key],
				)
			: [];

		return {
			testId: test.id,
			questionId: question.id,
			questionTitle: question.title,
			variants,
			answer: [...new Set(answer)],
		};
	});
};
