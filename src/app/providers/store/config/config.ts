import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from '@/shared/config/api/baseApi';
import { State } from '@/shared/config/store/State';

import { rootReducer } from '../rootReducer';

export const createReduxStore = (initialState?: State) => {
	return configureStore({
		reducer: rootReducer,
		devTools: __IS_DEV__,
		preloadedState: initialState,

		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
	});
};

export type RootState = ReturnType<typeof rootReducer>;
