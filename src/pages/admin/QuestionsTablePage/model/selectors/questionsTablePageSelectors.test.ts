import { State } from '@/shared/config/store/State';
import { SelectedAdminEntities } from '@/shared/types/types';

import { getSelectedQuestions } from './questionsTablePageSelectors';

describe('questionsPageSelectors', () => {
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
