import { State } from '@/shared/config/store/State';
import { SelectedAdminEntities } from '@/shared/types/types';

import { getSelectedSpecializations } from './specializationsPageSelectors';

describe('specializationsPageSelectors', () => {
	describe('getSelectedSpecializations', () => {
		test('have value', () => {
			const selectedSpecializations: SelectedAdminEntities = [
				{
					id: 1,
					title: 'specialization',
				},
			];
			const state: DeepPartial<State> = {
				specializationsPage: { selectedSpecializations },
			};
			expect(getSelectedSpecializations(state as State)).toEqual(selectedSpecializations);
		});
		test('empty value', () => {
			const state: DeepPartial<State> = {
				specializationsPage: {},
			};
			expect(getSelectedSpecializations(state as State)).toEqual([]);
		});
	});
});
