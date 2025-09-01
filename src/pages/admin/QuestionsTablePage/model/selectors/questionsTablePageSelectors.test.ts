import { State } from '@/shared/config/store/State';
import { SelectedAdminEntities } from '@/shared/types/types';

import {
	getQuestionsPageNum,
	getQuestionsSearch,
	getSelectedQuestions,
} from './questionsTablePageSelectors';

describe('questionsPageSelectors', () => {
	describe('getQuestionsPageNum', () => {
		test('have value', () => {
			const state: DeepPartial<State> = {
				questionsTablePage: { page: 2 },
			};
			expect(getQuestionsPageNum(state as State)).toEqual(2);
		});
		test('empty value', () => {
			const state: DeepPartial<State> = {
				questionsTablePage: {},
			};
			expect(getQuestionsPageNum(state as State)).toEqual(1);
		});
	});

	describe('getQuestionsSearch', () => {
		test('have value', () => {
			const state: DeepPartial<State> = {
				questionsTablePage: { search: 'search' },
			};
			expect(getQuestionsSearch(state as State)).toEqual('search');
		});
		test('empty value', () => {
			const state: DeepPartial<State> = {
				questionsTablePage: {},
			};
			expect(getQuestionsSearch(state as State)).toEqual('');
		});
	});

	describe('getSelectedQuestions', () => {
		test('have value', () => {
			const selectedQuestions: SelectedAdminEntities = [
				{
					id: 1,
					title: 'question',
				},
			];
			const state: DeepPartial<State> = {
				questionsTablePage: { selectedQuestions },
			};
			expect(getSelectedQuestions(state as State)).toEqual(selectedQuestions);
		});
		test('empty value', () => {
			const state: DeepPartial<State> = {
				questionsTablePage: {},
			};
			expect(getSelectedQuestions(state as State)).toEqual([]);
		});
	});
});
