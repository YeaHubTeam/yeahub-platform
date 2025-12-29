import { State } from '@/shared/config';

export const getSelectedCollections = (state: State) =>
	state.collectionsPage?.selectedCollections || [];
