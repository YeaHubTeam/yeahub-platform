import { questionsPageActions, questionsPageReducer } from '../slices/questionsPageSlice';
import { QuestionsPageState } from '../types/questionsPageTypes';

describe('questionsPageSlice', () => {
	test('change page num', () => {
		const state: QuestionsPageState = {
			page: 1,
		};
		expect(questionsPageReducer(state, questionsPageActions.setPage(2))).toEqual({
			page: 2,
		});
	});
});
