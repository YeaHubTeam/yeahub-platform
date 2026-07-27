import { createSlice } from '@reduxjs/toolkit';

import { featureFlagApi } from '../../api/featureFlagApi';
import { FeatureFlagApiItem, Flag } from '../types/featureFlag';

export type FeatureFlagState = Record<Flag, FeatureFlagApiItem>;

const initialState: FeatureFlagState = {};

export const featureFlagSlice = createSlice({
	name: 'featureFlag',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			featureFlagApi.endpoints.getFeatureFlagsList.matchFulfilled,
			(state, { payload }) => {
				payload.data.forEach((item: FeatureFlagApiItem) => {
					state[item.flag] = item;
				});
			},
		);
	},
});

export const featureFlagReducer = featureFlagSlice.reducer;
