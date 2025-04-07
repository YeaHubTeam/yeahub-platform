import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Value } from '@/shared/ui/Calendar/EventCalendar';

import { InterviewHistoryState } from '../types/InterviewHistoryPageType';

const initialState: InterviewHistoryState = {
	dateRange: null,
};

const interviewHistoryPageSlice = createSlice({
	name: 'filterDate',
	initialState,
	reducers: {
		setDateRange(state, action: PayloadAction<Value>) {
			state.dateRange = action.payload;
		},
	},
});

export const { reducer: interviewHistoryPageReducer, actions: interviewHistoryPageActions } =
	interviewHistoryPageSlice;
