import { combineReducers, Store } from '@reduxjs/toolkit';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { baseApi } from '../query/baseApi';

import { createReduxStore } from './config';
import { State } from './State';
import { RootReducer } from './types';

interface StoreProviderProps {
	/**
	 * Default state for redux, including optional reducers
	 */
	initialState?: DeepPartial<State>;
	reducers: DeepPartial<RootReducer>;
	store?: Store;
}

/**
 * Provider for redux store
 * @param children
 * @param initialState
 * @constructor
 */

export const StoreProvider = ({
	children,
	initialState,
	reducers,
	store,
}: PropsWithChildren<StoreProviderProps>) => {
	const initialStore = createReduxStore({
		initialState: initialState as State,
		reducers: combineReducers({ ...reducers, [baseApi.reducerPath]: baseApi.reducer }),
	});

	return <Provider store={store || initialStore}>{children}</Provider>;
};
