import { SelectedAdminEntities } from '@/shared/types/types';

export interface ResourcesAllTabState {
	page: number;
	selectedResources?: SelectedAdminEntities;
	search?: string;
}
