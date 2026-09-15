import { Decorator } from '@storybook/react';

import { RootReducer, State, StoreProvider } from '../../redux';

export const StoreDecorator =
	(state: DeepPartial<State>, reducers: DeepPartial<RootReducer>): Decorator =>
	// eslint-disable-next-line react/display-name
	(Story) => (
		<StoreProvider initialState={state} reducers={reducers}>
			<Story />
		</StoreProvider>
	);
