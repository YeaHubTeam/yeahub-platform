import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Value } from '@/shared/ui/Calendar/ui/EventCalendar';

import { InterviewHistoryPage } from '../types/InterviewHistoryPageType';

const initialState: InterviewHistoryPage = {
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
