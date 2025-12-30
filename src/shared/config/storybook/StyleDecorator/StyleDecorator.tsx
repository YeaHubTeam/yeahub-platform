import { StoryFn } from '@storybook/react';

import '@/app/styles/normalize.css';
import '@/app/styles/App.css';

export const StyleDecorator = (Story: StoryFn) => {
	return <Story />;
};
