import { StoryFn } from '@storybook/react';

import { RootReducer, State, StoreProvider } from '../../redux';

export const StoreDecorator =
	// eslint-disable-next-line react/display-name
	(state: DeepPartial<State>, reducers: DeepPartial<RootReducer>) => (Story: StoryFn) => (
		<StoreProvider initialState={state} reducers={reducers}>
			<Story />
		</StoreProvider>
	);
