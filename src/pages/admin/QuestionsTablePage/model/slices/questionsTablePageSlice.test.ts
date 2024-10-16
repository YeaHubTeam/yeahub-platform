import { QuestionsTablePageState } from '../types/questionsTablePageTypes';

import { questionsTablePageActions, questionsTablePageReducer } from './questionsTablePageSlice';

describe('questionsPageSlice', () => {
	test('change page num', () => {
		const state: QuestionsTablePageState = {
			page: 1,
		};
		expect(questionsTablePageReducer(state, questionsTablePageActions.setPage(2))).toEqual({
			page: 2,
		});
	});
});
