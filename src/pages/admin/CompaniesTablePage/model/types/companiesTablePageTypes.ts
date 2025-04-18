import { SelectedAdminEntities } from '@/shared/types/types';

export interface ICompaniesTablePageState {
	page: number;
	selectedCompanies?: SelectedAdminEntities;
	search?: string;
}
