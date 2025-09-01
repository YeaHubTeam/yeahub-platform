import { State } from '@/shared/config/store/State';
import { SelectedAdminEntities } from '@/shared/types/types';

import {
	getSelectedSpecializations,
	getSpecializationsPageNum,
	getSpecializationsSearch,
} from './specializationsPageSelectors';

describe('specializationsPageSelectors', () => {
	describe('getSpecializationsPageNum', () => {
		test('have value', () => {
			const state: DeepPartial<State> = {
				specializationsPage: { page: 2 },
			};
			expect(getSpecializationsPageNum(state as State)).toEqual(2);
		});
		test('empty value', () => {
			const state: DeepPartial<State> = {
				specializationsPage: {},
			};
			expect(getSpecializationsPageNum(state as State)).toEqual(1);
		});
	});

	describe('getSpecializationsSearch', () => {
		test('have value', () => {
			const state: DeepPartial<State> = {
				specializationsPage: { search: 'search' },
			};
			expect(getSpecializationsSearch(state as State)).toEqual('search');
		});
		test('empty value', () => {
			const state: DeepPartial<State> = {
				specializationsPage: {},
			};
			expect(getSpecializationsSearch(state as State)).toEqual('');
		});
	});

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
