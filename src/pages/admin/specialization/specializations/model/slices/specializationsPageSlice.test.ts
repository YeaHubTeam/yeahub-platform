import { SelectedAdminEntities } from '@/shared/libs';

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
	test('change selected specializations', () => {
		const state: SpecializationsPageState = {
			selectedSpecializations: selectedSpecializations.slice(0, 1),
		};
		expect(
			specializationsPageReducer(
				state,
				specializationsPageActions.setSelectedSpecializations(selectedSpecializations),
			),
		).toEqual({
			selectedSpecializations,
		});
	});
});
