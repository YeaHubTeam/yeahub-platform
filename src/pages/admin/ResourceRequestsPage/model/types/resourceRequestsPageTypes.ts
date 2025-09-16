import { SelectedResourceRequestEntities } from '@/entities/resource';

export interface ResourceRequestsPageState {
	page: number;
	selectedResourceRequests: SelectedResourceRequestEntities;
	search?: string;
}
