import { configureStore } from '@reduxjs/toolkit';

import { usersApi, usersSlice } from '@/entities/users';

// import { baseApi } from '@/shared/config/api/baseApi';
// import { State } from '@/shared/config/store/State';

// import { rootReducer } from '../rootReducer';

// export const createReduxStore = (initialState?: State) => {
// 	return configureStore({
// 		reducer: rootReducer,
// 		devTools: __IS_DEV__,
// 		preloadedState: initialState,

// 		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
// 	});
// };

// export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
	reducer: {
		users: usersSlice.reducer,
		[usersApi.reducerPath]: usersApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([usersApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
