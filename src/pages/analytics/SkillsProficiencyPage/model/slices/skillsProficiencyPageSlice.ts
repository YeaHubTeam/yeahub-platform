import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SkillsProficiencyPageState } from '../types/skillsProficiencyPageTypes';

const initialState: SkillsProficiencyPageState = {
	page: 1,
	specializationId: undefined,
	skillId: undefined,
	limit: 6,
};

const skillsProficiencyPageSlice = createSlice({
	name: 'skillsProficiency',
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		setSelectedSpecialization: (state, action: PayloadAction<number>) => {
			state.specializationId = action.payload;
			state.skillId = undefined;
			state.page = 1;
		},
		setSelectedSkill: (state, action: PayloadAction<number>) => {
			state.skillId = action.payload;
			state.page = 1;
		},
	},
});

export const { reducer: skillsProficiencyReducer, actions: skillsProficiencyActions } =
	skillsProficiencyPageSlice;
