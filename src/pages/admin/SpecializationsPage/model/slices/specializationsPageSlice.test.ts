import { SpecializationsPageState } from '../types/specializationsPageTypes';

import { specializationsPageActions, specializationsPageReducer } from './specializationsPageSlice';

describe('specializationsPageSlice', () => {
	test('change page num', () => {
		const state: SpecializationsPageState = {
			page: 1,
		};
		expect(specializationsPageReducer(state, specializationsPageActions.setPage(2))).toEqual({
			page: 2,
		});
	});
});
