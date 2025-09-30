import { State } from '@/shared/config/store/State';

export const getResourcesAllTabPage = (state: State) => state.resourcesAllTab.page || 1;
export const getResourcesAllTabSearch = (state: State) => state.resourcesAllTab.search || '';
export const getResourcesAllTabSelected = (state: State) =>
	state.resourcesAllTab.selectedResources || [];
