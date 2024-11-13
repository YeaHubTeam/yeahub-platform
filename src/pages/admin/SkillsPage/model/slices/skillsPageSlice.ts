import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SelectedAdminEntities } from '@/shared/types/types';

import { deleteMultipleSkills } from '@/features/skill/deleteSkills';

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
			state.selectedSkills = [];
		},
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
		setSelectedSkills: (state, action: PayloadAction<SelectedAdminEntities>) => {
			state.selectedSkills = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(deleteMultipleSkills.fulfilled, (state) => {
			state.selectedSkills = [];
		});
	},
});

export const { reducer: skillsPageReducer, actions: skillsPageActions } = skillsPageSlice;
