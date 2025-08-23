import { State } from '@/shared/config/store/State';
import { SelectedAdminEntities } from '@/shared/types/types';

import { getSelectedSkills, getSkillsPageNum, getSkillsSearch } from './skillsPageSelectors';

describe('skillsPageSelectors', () => {
	describe('getSkillsPageNum', () => {
		test('have value', () => {
			const state: DeepPartial<State> = {
				skillsPage: { page: 2 },
			};
			expect(getSkillsPageNum(state as State)).toEqual(2);
		});
		test('empty value', () => {
			const state: DeepPartial<State> = {
				skillsPage: {},
			};
			expect(getSkillsPageNum(state as State)).toEqual(1);
		});
	});

	describe('getSpecializationsSearch', () => {
		test('have value', () => {
			const state: DeepPartial<State> = {
				skillsPage: { search: 'search' },
			};
			expect(getSkillsSearch(state as State)).toEqual('search');
		});
		test('empty value', () => {
			const state: DeepPartial<State> = {
				skillsPage: {},
			};
			expect(getSkillsSearch(state as State)).toEqual('');
		});
	});

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
