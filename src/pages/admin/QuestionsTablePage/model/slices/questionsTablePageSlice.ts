import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { clearStore } from '@/shared/config/store/clearStore';
import { SelectedAdminEntities } from '@/shared/types/types';

import { deleteMultipleQuestionsThunk } from '@/features/question/deleteQuestions';

import { QuestionsTablePageState } from '../types/questionsTablePageTypes';

export const initialState: QuestionsTablePageState = {
	page: 1,
	selectedQuestions: [],
	search: '',
};

const questionsTablePageSlice = createSlice({
	name: 'questionsPage',
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
			state.selectedQuestions = [];
		},
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
		setSelectedQuestions: (state, action: PayloadAction<SelectedAdminEntities>) => {
			state.selectedQuestions = action.payload;
		},
		resetFilters: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(clearStore, () => {
			return initialState;
		});
		builder.addCase(deleteMultipleQuestionsThunk.fulfilled, (state) => {
			state.selectedQuestions = [];
		});
	},
});

export const { reducer: questionsTablePageReducer, actions: questionsTablePageActions } =
	questionsTablePageSlice;
