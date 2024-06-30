import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from '@/shared/config/api/baseApi';
import { State } from '@/shared/config/store/State';

import { authSlice } from '@/entities/auth';

import { questionsPageReducer } from '@/pages/QuestionsPage';

import { router } from '../../router';

export const createReduxStore = (initialState?: State) => {
	return configureStore({
		reducer: {
			auth: authSlice.reducer,
			questionsPage: questionsPageReducer,
			[baseApi.reducerPath]: baseApi.reducer,
		},
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: {
					extraArgument: {
						navigate: router.navigate,
					},
				},
			}).concat(baseApi.middleware),
	});
};

const store = createReduxStore();
export type RootState = ReturnType<typeof store.getState>;
