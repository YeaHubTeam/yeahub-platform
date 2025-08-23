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
	test('change page num', () => {
		const state: QuestionsTablePageState = {
			page: 1,
		};
		expect(questionsTablePageReducer(state, questionsTablePageActions.setPage(2))).toEqual({
			page: 2,
			selectedQuestions: [],
		});
	});

	test('change page search', () => {
		const state: QuestionsTablePageState = {
			page: 1,
			search: '',
		};
		expect(questionsTablePageReducer(state, questionsTablePageActions.setSearch('search'))).toEqual(
			{
				page: 1,
				search: 'search',
			},
		);
	});

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
