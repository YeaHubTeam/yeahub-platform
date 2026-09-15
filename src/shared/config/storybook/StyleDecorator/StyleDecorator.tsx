import { Decorator } from '@storybook/react';

import '@/app/styles/normalize.css';
import '@/app/styles/App.css';

export const StyleDecorator: Decorator = (Story) => {
	return <Story />;
};
