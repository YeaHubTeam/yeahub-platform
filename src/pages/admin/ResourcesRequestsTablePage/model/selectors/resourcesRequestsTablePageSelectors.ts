import { State } from '@/shared/config/store/State';

export const getResourceRequestsPageNum = (state: State) =>
	state.resourceRequestsTablePage?.page || 1;

export const getResourceRequestsSearch = (state: State) =>
	state.resourceRequestsTablePage?.search || '';

export const getSelectedResourceRequests = (state: State) =>
	state.resourceRequestsTablePage?.selectedResourcesRequests;
