import { SelectedAdminEntities } from '@/shared/types/types';

import { QuestionsTablePageState } from '../types/questionsTablePageTypes';

import {
	initialState,
	questionsTablePageActions,
	questionsTablePageReducer,
} from './questionsTablePageSlice';

const selectedQuestions: SelectedAdminEntities = [
	{
		id: 1,
		title: 'question 1',
	},
	{
		id: 2,
		title: 'question 2',
	},
];

describe('questionsPageSlice', () => {
	test('change selected questions', () => {
		const state: QuestionsTablePageState = {
			page: 1,
			selectedQuestions: selectedQuestions.slice(0, 1),
		};
		expect(
			questionsTablePageReducer(
				state,
				questionsTablePageActions.setSelectedQuestions(selectedQuestions),
			),
		).toEqual({
			page: 1,
			selectedQuestions,
		});
	});

	test('reset filters', () => {
		const state: QuestionsTablePageState = {
			page: 2,
			search: 'search',
			selectedQuestions,
		};
		expect(questionsTablePageReducer(state, questionsTablePageActions.resetFilters())).toEqual(
			initialState,
		);
	});
});
