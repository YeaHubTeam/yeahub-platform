import { SelectedAdminEntities } from '@/shared/types/types';

export interface ResourcesTablePageState {
	page: number;
	selectedResources?: SelectedAdminEntities;
	search?: string;
}
