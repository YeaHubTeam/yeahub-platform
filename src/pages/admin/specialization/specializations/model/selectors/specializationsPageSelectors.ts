import { State } from '@/shared/config';

export const getSelectedSpecializations = (state: State) =>
	state.specializationsPage.selectedSpecializations || [];
