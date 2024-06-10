import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from '@/shared/config/api/baseApi';
import { State } from '@/shared/config/store/State';

import { authSlice } from '@/entities/auth';

export const createReduxStore = (initialState?: State) => {
	return configureStore({
		reducer: {
			auth: authSlice.reducer,
			[baseApi.reducerPath]: baseApi.reducer,
		},
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
	});
};
