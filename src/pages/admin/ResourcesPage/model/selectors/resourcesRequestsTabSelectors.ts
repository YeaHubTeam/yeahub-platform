import { State } from '@/shared/config/store/State';

export const getResourcesRequestsTabPage = (state: State) => state.resourcesRequestsTab?.page || 1;
export const getResourcesRequestsTabSearch = (state: State) =>
	state.resourcesRequestsTab?.search || '';
export const getResourcesRequestsTabSelected = (state: State) =>
	state.resourcesRequestsTab?.selectedResourcesRequests;
