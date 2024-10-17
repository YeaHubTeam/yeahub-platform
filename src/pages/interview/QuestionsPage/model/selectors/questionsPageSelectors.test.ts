import { State } from '@/shared/config/store/State';

import { getQuestionsPageNum } from './questionsPageSelectors';

describe('questionsPageSelectors', () => {
	test('getQuestionsPageNum', () => {
		const state: DeepPartial<State> = {
			questionsPage: { page: 2 },
		};
		expect(getQuestionsPageNum(state as State)).toEqual(2);
	});
});
