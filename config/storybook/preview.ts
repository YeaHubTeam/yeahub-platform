import type { Preview } from '@storybook/react-webpack5';

import i18n from '../../src/shared/config/i18n/i18n';
import { RouteDecorator, StyleDecorator } from '../../src/shared/config/storybook';

const preview: Preview = {
	parameters: {
		backgrounds: {
			options: {
				light: {
					name: 'light',
					value: '#F4F4F4',
				},
			},
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		i18n,
	},
	decorators: [RouteDecorator, StyleDecorator],
	initialGlobals: {
		locale: 'en',
		locales: {
			en: 'English',
			ru: 'Русский',
		},
		backgrounds: {
			value: 'light',
		},
	},
};

export default preview;
