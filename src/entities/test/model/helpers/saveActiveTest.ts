import { getJSONFromLS, setToLS } from '@/shared/libs';

import { LS_ACTIVE_TESTS_KEY } from '../constants/testConstants';
import { ActiveTests, TestAnswer } from '../types/testTypes';

export const saveActiveTest = (profileId: string, answers: TestAnswer[]) => {
	const activeTestsFromLS = getJSONFromLS(LS_ACTIVE_TESTS_KEY);
	const activeTests: ActiveTests =
		activeTestsFromLS && typeof activeTestsFromLS === 'object' && !Array.isArray(activeTestsFromLS)
			? activeTestsFromLS
			: {};

	setToLS(LS_ACTIVE_TESTS_KEY, {
		...activeTests,
		[profileId]: answers,
	});
};
