import { State } from '@/shared/config/store/State';

export const getSelectedSpecializations = (state: State) =>
	state.specializationsPage.selectedSpecializations || [];
