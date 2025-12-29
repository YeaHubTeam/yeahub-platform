import { configureStore, Middleware, Reducer } from '@reduxjs/toolkit';

import { baseApi } from '../query';
import { sentryApiErrorMiddleware, sentryMiddleware } from '../sentry';

import { State } from './State';
import { ExtraArgument } from './types';

interface CreateReduxStoreParams {
	initialState?: State;
	reducers: Reducer<State>;
	middleware?: Middleware;
	extraArgument?: ExtraArgument;
}

export const createReduxStore = ({
	initialState,
	reducers,
	middleware,
	extraArgument,
}: CreateReduxStoreParams) => {
	const middlewares = middleware
		? [baseApi.middleware, middleware, sentryMiddleware, sentryApiErrorMiddleware]
		: [baseApi.middleware, sentryMiddleware, sentryApiErrorMiddleware];

	return configureStore({
		reducer: reducers,
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: {
					extraArgument,
				},
			}).concat(middlewares),
	});
};
