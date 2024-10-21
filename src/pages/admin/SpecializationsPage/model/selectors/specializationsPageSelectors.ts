import { State } from '@/shared/config/store/State';

export const getSpecializationsPageNum = (state: State) => state.specializationsPage.page || 1;
export const getSpecializationsSearch = (state: State) => state.specializationsPage.search || '';

export const getSelectedSpecializations = (state: State) =>
	state.specializationsPage.selectedSpecializations || [];
