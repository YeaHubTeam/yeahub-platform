import { State } from '@/shared/config/store/State';

export const getSelectedCompanies = (state: State) =>
	state.companiesTablePage.selectedCompanies || [];
