import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { clearStore } from '@/shared/config';
import { Value } from '@/shared/ui/Calendar';

import { TestHistoryState } from '../types/TestHistoryPageType';

const initialState: TestHistoryState = {
	dateRange: [new Date(0), new Date()],
};

const testHistoryPageSlice = createSlice({
	name: 'testFilterDate',
	initialState,
	reducers: {
		setDateRange(state, action: PayloadAction<Value>) {
			state.dateRange = action.payload;
		},
		resetDateRange(state) {
			state.dateRange = initialState.dateRange;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(clearStore, () => {
			return initialState;
		});
	},
});

export const { reducer: testHistoryPageReducer, actions: testHistoryPageActions } =
	testHistoryPageSlice;
