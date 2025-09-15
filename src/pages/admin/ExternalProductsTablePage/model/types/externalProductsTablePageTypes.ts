import { SelectedAdminEntities } from '@/shared/types/types';

export interface ExternalProductsTablePageState {
	page: number;
	selectedExternalProducts?: SelectedAdminEntities;
	search?: string;
}
