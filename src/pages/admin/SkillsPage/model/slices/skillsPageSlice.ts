import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SkillsPageState } from '../types/skillsPageTypes';

const initialState: SkillsPageState = {
	page: 1,
	selectedSkills: [],
	search: '',
};

const skillsPageSlice = createSlice({
	name: 'skillsPage',
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
		setSelectedSkills: (state, action: PayloadAction<number[]>) => {
			state.selectedSkills = action.payload;
		},
	},
});

export const { reducer: skillsPageReducer, actions: skillsPageActions } = skillsPageSlice;
