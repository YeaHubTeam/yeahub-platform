import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { StoreProvider } from '@/app/providers/store';

import jestI18n from '../../../config/jest/jestI18n';
import { State } from '../../../config/store/State';

interface RenderComponentOptions {
	/**
	 * Default url
	 */
	route?: string;
	/**
	 * Default redux state
	 */
	initialState?: DeepPartial<State>;
}

/**
 * Provider for testing, including all providers
 * @param component
 * @param options
 */
export const renderComponent = (component: ReactNode, options: RenderComponentOptions = {}) => {
	const { route = '/', initialState } = options;

	return render(
		<StoreProvider initialState={initialState}>
			<MemoryRouter initialEntries={[route]}>
				<I18nextProvider i18n={jestI18n}>{component}</I18nextProvider>
			</MemoryRouter>
		</StoreProvider>,
	);
};
