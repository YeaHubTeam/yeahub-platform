import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { SelectedAdminEntities } from '@/shared/libs';

import type { TasksTablePageState } from '../types/tasksTablePageTypes';

export const initialState: TasksTablePageState = {
	page: 1,
	selectedTasks: [],
	search: '',
};

const tasksTablePageSlice = createSlice({
	name: 'tasksPage',
	initialState,
	reducers: {
		setSelectedTasks: (state, action: PayloadAction<SelectedAdminEntities<string>>) => {
			state.selectedTasks = action.payload;
		},
		resetFilters: () => initialState,
	},
});

export const { reducer: tasksTablePageReducer, actions: tasksTablePageActions } =
	tasksTablePageSlice;
