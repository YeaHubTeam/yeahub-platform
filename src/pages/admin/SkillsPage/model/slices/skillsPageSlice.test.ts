import { SkillsPageState } from '../types/skillsPageTypes';

import { skillsPageActions, skillsPageReducer } from './skillsPageSlice';

describe('skillsPageSlice', () => {
	test('change page num', () => {
		const state: SkillsPageState = {
			page: 1,
		};
		expect(skillsPageReducer(state, skillsPageActions.setPage(2))).toEqual({
			page: 2,
		});
	});
});
