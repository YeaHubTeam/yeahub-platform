import { SelectedAdminEntities } from '@/shared/types/types';

import { SpecializationsPageState } from '../types/specializationsPageTypes';

import { specializationsPageActions, specializationsPageReducer } from './specializationsPageSlice';

const selectedSpecializations: SelectedAdminEntities = [
	{
		id: 1,
		title: 'specialization 1',
	},
	{
		id: 2,
		title: 'specialization 2',
	},
];

describe('specializationsPageSlice', () => {
	test('change page num', () => {
		const state: SpecializationsPageState = {
			page: 1,
		};
		expect(specializationsPageReducer(state, specializationsPageActions.setPage(2))).toEqual({
			page: 2,
			selectedSpecializations: [],
		});
	});

	test('change page search', () => {
		const state: SpecializationsPageState = {
			page: 1,
			search: '',
		};
		expect(
			specializationsPageReducer(state, specializationsPageActions.setSearch('search')),
		).toEqual({
			page: 1,
			search: 'search',
		});
	});

	test('change selected specializations', () => {
		const state: SpecializationsPageState = {
			page: 1,
			selectedSpecializations: selectedSpecializations.slice(0, 1),
		};
		expect(
			specializationsPageReducer(
				state,
				specializationsPageActions.setSelectedSpecializations(selectedSpecializations),
			),
		).toEqual({
			page: 1,
			selectedSpecializations,
		});
	});
});
