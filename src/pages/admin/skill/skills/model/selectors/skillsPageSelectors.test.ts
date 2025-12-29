import { State } from '@/shared/config';
import { SelectedAdminEntities } from '@/shared/libs';

import { getSelectedSkills } from './skillsPageSelectors';

describe('skillsPageSelectors', () => {
	describe('getSelectedSkills', () => {
		test('have value', () => {
			const selectedSkills: SelectedAdminEntities = [
				{
					id: 1,
					title: 'skill',
				},
			];
			const state: DeepPartial<State> = {
				skillsPage: { selectedSkills },
			};
			expect(getSelectedSkills(state as State)).toEqual(selectedSkills);
		});
		test('empty value', () => {
			const state: DeepPartial<State> = {
				skillsPage: {},
			};
			expect(getSelectedSkills(state as State)).toEqual([]);
		});
	});
});
