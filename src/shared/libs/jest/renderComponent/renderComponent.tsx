import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';

import { i18nForJest } from '../../../config/jest';
import { RootReducer, State, StoreProvider } from '../../../config/redux';

interface RenderComponentOptions {
	/**
	 * Default url
	 */
	route?: string;
	/**
	 * Default redux state
	 */
	initialState?: DeepPartial<State>;
	reducers?: DeepPartial<RootReducer>;
}

/**
 * Provider for testing, including all providers
 * @param component
 * @param options
 */
export const renderComponent = (component: ReactNode, options: RenderComponentOptions = {}) => {
	const { route = '/', initialState = {}, reducers = {} } = options;
	console.log(2222, component);
	return render(
		<StoreProvider initialState={initialState} reducers={reducers}>
			<MemoryRouter initialEntries={[route]}>
				<I18nextProvider i18n={i18nForJest}>{component}</I18nextProvider>
			</MemoryRouter>
		</StoreProvider>,
	);
};
