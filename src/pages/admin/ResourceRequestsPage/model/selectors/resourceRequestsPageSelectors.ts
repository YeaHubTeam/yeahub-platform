import { State } from '@/shared/config/store/State';

export const getResourceRequestsPageNum = (state: State) => state.resourceRequestsPage?.page || 1;

export const getResourceRequestsSearch = (state: State) => state.resourceRequestsPage?.search || '';

export const getSelectedResourceRequests = (state: State) =>
	state.resourceRequestsPage?.selectedResourceRequests;
