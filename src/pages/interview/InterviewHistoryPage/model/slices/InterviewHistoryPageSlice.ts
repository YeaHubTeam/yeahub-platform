import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Value } from '@/shared/ui/Calendar/EventCalendar';

import { InterviewHistoryState } from '../types/InterviewHistoryPageType';

const initialState: InterviewHistoryState = {
	dateRange: [new Date(0), new Date()],
};

const interviewHistoryPageSlice = createSlice({
	name: 'filterDate',
	initialState,
	reducers: {
		setDateRange(state, action: PayloadAction<Value>) {
			state.dateRange = action.payload;
		},
		resetDateRange(state) {
			state.dateRange = initialState.dateRange;
		},
	},
});

export const { reducer: interviewHistoryPageReducer, actions: interviewHistoryPageActions } =
	interviewHistoryPageSlice;
