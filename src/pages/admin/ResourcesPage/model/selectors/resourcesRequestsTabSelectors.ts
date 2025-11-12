import { State } from '@/shared/config/store/State';

export const getResourcesRequestsTabSelected = (state: State) =>
	state.resourcesRequestsTab?.selectedResourcesRequests;
