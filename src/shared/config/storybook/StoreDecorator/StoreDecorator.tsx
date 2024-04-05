import { StoryFn } from '@storybook/react';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { StoreProvider } from '@/app/providers/store';

import { State } from '../../store/State';

// eslint-disable-next-line react/display-name
export const StoreDecorator = (state: DeepPartial<State>) => (Story: StoryFn) => (
	<StoreProvider initialState={state}>
		<Story />
	</StoreProvider>
);
