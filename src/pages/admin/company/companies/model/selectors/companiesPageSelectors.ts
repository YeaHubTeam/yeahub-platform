import { State } from '@/shared/config';

export const getSelectedCompanies = (state: State) => state.companiesPage?.selectedCompanies || [];
