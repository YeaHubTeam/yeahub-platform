import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { State } from '@/shared/config/store/State';

import { store } from '../config/config';

interface StoreProviderProps {
	/**
	 * Default state for redux, including optional reducers
	 */
	initialState?: DeepPartial<State>;
}

/**
 * Provider for redux store
 * @param children
 * @param initialState
 * @constructor
 */

export const StoreProvider = ({ children }: PropsWithChildren<StoreProviderProps>) => {
	// console.log(initialState);
	// const store = createReduxStore(initialState as State);

	return <Provider store={store}>{children}</Provider>;
};
