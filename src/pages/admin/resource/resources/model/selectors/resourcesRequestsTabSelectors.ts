import { State } from '@/shared/config';

export const getResourcesRequestsTabSelected = (state: State) =>
	state.resourcesRequestsTab?.selectedResourcesRequests;
