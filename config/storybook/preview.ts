import type { Preview } from '@storybook/react';

import i18n from '../../src/shared/config/i18n/i18n';
import { RouteDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';

const preview: Preview = {
  globals: {
    locale: 'en',
    locales: {
      en: 'English',
      ru: 'Русский',
    },
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    i18n,
  },
  decorators: [RouteDecorator, StyleDecorator],
};

export default preview;
