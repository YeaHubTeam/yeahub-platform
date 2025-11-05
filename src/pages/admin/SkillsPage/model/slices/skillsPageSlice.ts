import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { clearStore } from '@/shared/config/store/clearStore';
import { SelectedAdminEntities } from '@/shared/types/types';

import { deleteMultipleSkillsThunk } from '@/features/skill/deleteSkills';

import { SkillsPageState } from '../types/skillsPageTypes';

const initialState: SkillsPageState = {
	selectedSkills: [],
};

const skillsPageSlice = createSlice({
	name: 'skillsPage',
	initialState,
	reducers: {
		setSelectedSkills: (state, action: PayloadAction<SelectedAdminEntities>) => {
			state.selectedSkills = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(deleteMultipleSkillsThunk.fulfilled, (state) => {
			state.selectedSkills = [];
		});
		builder.addCase(clearStore, () => {
			return initialState;
		});
	},
});

export const { reducer: skillsPageReducer, actions: skillsPageActions } = skillsPageSlice;
