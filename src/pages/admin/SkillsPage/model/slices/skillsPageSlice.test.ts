import { SelectedAdminEntities } from '@/shared/types/types';

import { SkillsPageState } from '../types/skillsPageTypes';

import { skillsPageActions, skillsPageReducer } from './skillsPageSlice';

const selectedSkills: SelectedAdminEntities = [
	{
		id: 1,
		title: 'skill 1',
	},
	{
		id: 2,
		title: 'skill 2',
	},
];

describe('skillsPageSlice', () => {
	test('change page num', () => {
		const state: SkillsPageState = {
			page: 1,
		};
		expect(skillsPageReducer(state, skillsPageActions.setPage(2))).toEqual({
			page: 2,
			selectedSkills: [],
		});
	});

	test('change page search', () => {
		const state: SkillsPageState = {
			page: 1,
			search: '',
		};
		expect(skillsPageReducer(state, skillsPageActions.setSearch('search'))).toEqual({
			page: 1,
			search: 'search',
		});
	});

	test('change selected specializations', () => {
		const state: SkillsPageState = {
			page: 1,
			selectedSkills: selectedSkills.slice(0, 1),
		};
		expect(skillsPageReducer(state, skillsPageActions.setSelectedSkills(selectedSkills))).toEqual({
			page: 1,
			selectedSkills,
		});
	});
});
