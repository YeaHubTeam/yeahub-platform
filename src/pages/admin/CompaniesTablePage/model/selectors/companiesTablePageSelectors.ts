import { State } from '@/shared/config/store/State';

export const getCompaniesPageNum = (state: State) => state.companiesTablePage.page || 1;
export const getCompaniesSearch = (state: State) => state.companiesTablePage.search || '';
export const getSelectedCompanies = (state: State) =>
	state.companiesTablePage.selectedCompanies || [];
