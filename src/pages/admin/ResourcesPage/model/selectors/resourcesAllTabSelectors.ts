import { State } from '@/shared/config/store/State';

export const getResourcesAllTabSelected = (state: State) =>
	state.resourcesAllTab.selectedResources || [];
