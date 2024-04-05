import { StoryFn } from '@storybook/react';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import '@/app/styles/normalize.css';
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import '@/app/styles/App.module.css';

export const StyleDecorator = (Story: StoryFn) => {
	return <Story />;
};
