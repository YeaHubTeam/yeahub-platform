import { SelectedAdminEntities } from '@/shared/types/types';

export interface CompaniesTablePageState {
	page: number;
	selectedCompanies?: SelectedAdminEntities;
	search?: string;
}
