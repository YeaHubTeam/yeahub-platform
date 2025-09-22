import { SelectedResourceRequestEntities } from '@/entities/resource';

export interface ResourcesRequestsTablePageState {
	page: number;
	selectedResourcesRequests: SelectedResourceRequestEntities;
	search?: string;
}
