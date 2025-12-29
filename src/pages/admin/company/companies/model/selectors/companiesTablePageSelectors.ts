import { State } from '@/shared/config';

export const getSelectedCompanies = (state: State) =>
	state.companiesTablePage.selectedCompanies || [];
