import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { InterviewHistoryPageState } from '../types/InterviewHistoryPageType';

const initialState: InterviewHistoryPageState = {
	dateRange: [null, null],
};

const interviewHistoryPageSlice = createSlice({
	name: 'filterDate',
	initialState,
	reducers: {
		setDateRange(state, action: PayloadAction<[Date | null, Date | null]>) {
			state.dateRange = action.payload;
		},
	},
});

export const { reducer: interviewHistoryPageReducer, actions: interviewHistoryPageActions } =
	interviewHistoryPageSlice;
