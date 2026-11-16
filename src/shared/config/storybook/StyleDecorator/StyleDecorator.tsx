import { Decorator } from '@storybook/react-webpack5';

import '@/app/styles/normalize.css';
import '@/app/styles/App.css';

export const StyleDecorator: Decorator = (Story) => {
	return <Story />;
};
