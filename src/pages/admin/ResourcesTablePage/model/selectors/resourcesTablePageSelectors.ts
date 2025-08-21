import { State } from '@/shared/config/store/State';

export const getResourcesPageNum = (state: State) => state.resourcesTablePage.page || 1;
export const getResourcesSearch = (state: State) => state.resourcesTablePage.search || '';
export const getSelectedResources = (state: State) =>
	state.resourcesTablePage.selectedResources || [];
