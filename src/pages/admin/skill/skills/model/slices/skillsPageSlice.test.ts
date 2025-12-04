import { SelectedAdminEntities } from '@/shared/libs';

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
	test('change selected specializations', () => {
		const state: SkillsPageState = {
			selectedSkills: selectedSkills.slice(0, 1),
		};
		expect(skillsPageReducer(state, skillsPageActions.setSelectedSkills(selectedSkills))).toEqual({
			selectedSkills,
		});
	});
});
