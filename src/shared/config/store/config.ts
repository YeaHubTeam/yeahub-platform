import { configureStore } from '@reduxjs/toolkit';

import { State } from './State';

export const createReduxStore = (initialState?: State) => {
	return configureStore<State>({
		reducer: {},
		devTools: __IS_DEV__,
		preloadedState: initialState,
	});
};
