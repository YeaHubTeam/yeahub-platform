import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from '@/shared/config/api/baseApi';

import { authSlice } from '@/entities/auth';

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		[baseApi.reducerPath]: baseApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([baseApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
