import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DifficultQuestionsPageState } from '../types/difficultQuestionsPageTypes';

const initialState: DifficultQuestionsPageState = {
	specId: undefined,
};

const difficultQuestionsPageSlice = createSlice({
	name: 'difficultQuestions',
	initialState,
	reducers: {
		setSelectedSpecialization: (state, action: PayloadAction<number>) => {
			state.specId = action.payload;
		},
		resetSelectedSpecialization: (state) => {
			state.specId = undefined;
		},
	},
});

export const { reducer: difficultQuestionsReducer, actions: difficultQuestionsActions } =
	difficultQuestionsPageSlice;
