import { State } from '@/shared/config';

export const getResourcesAllTabSelected = (state: State) =>
	state.resourcesAllTab.selectedResources || [];
