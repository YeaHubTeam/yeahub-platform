import { State } from '@/shared/config/store/State';

export const getExternalProductsPageNum = (state: State) =>
	state.externalProductsTablePage.page || 1;
export const getExternalProductsSearch = (state: State) =>
	state.externalProductsTablePage.search || '';
export const getSelectedExternalProducts = (state: State) =>
	state.externalProductsTablePage.selectedExternalProducts || [];
