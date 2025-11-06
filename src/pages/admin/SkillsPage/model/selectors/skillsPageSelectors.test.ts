import { State } from '@/shared/config/store/State';
import { SelectedAdminEntities } from '@/shared/types/types';

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
