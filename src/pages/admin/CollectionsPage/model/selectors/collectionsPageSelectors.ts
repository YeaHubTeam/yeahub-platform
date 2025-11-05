import { State } from '@/shared/config/store/State';

export const getSelectedCollections = (state: State) =>
	state.collectionsPage?.selectedCollections || [];
