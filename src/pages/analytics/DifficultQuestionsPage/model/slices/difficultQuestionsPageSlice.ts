import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DifficultQuestionsPageState } from '../types/difficultQuestionsPageTypes';

const initialState: DifficultQuestionsPageState = {
	selectedSpecialization: undefined,
};

const difficultQuestionsPageSlice = createSlice({
	name: 'difficultQuestions',
	initialState,
	reducers: {
		setSelectedSpecialization: (state, action: PayloadAction<number>) => {
			state.selectedSpecialization = action.payload;
		},
		resetSelectedSpecialization: (state) => {
			state.selectedSpecialization = undefined;
		},
	},
});

export const { reducer: difficultQuestionsReducer, actions: difficultQuestionsActions } =
	difficultQuestionsPageSlice;
