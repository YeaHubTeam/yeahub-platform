import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { clearStore } from '@/shared/config';
import { SelectedAdminEntities } from '@/shared/libs';

import { deleteMultipleSkillsThunk } from '../../lib/thunks/deleteMultipleSkillsThunk';
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
