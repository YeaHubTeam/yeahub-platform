import { Reducer } from '@reduxjs/toolkit';

import { State } from './State';

export interface ExtraArgument {
	navigate: (path: string) => void;
}

export type RootReducer = {
	[K in keyof State]: Reducer<State[K]>;
};
