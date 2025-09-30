import { SelectedResourceRequestEntities } from '@/entities/resource';

export interface ResourcesRequestsTabState {
	page: number;
	selectedResourcesRequests: SelectedResourceRequestEntities;
	search?: string;
}
