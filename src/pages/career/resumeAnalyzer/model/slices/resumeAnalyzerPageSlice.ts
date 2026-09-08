import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
	ResumeAnalyzeByPortraitResponse,
	ResumeAnalyzerPageState,
} from '../../model/types/resumeAnalyzer';

const initialState: ResumeAnalyzerPageState = {
	data: null,
	fileName: '',
	uploadedAt: null,
};

const resumeAnalyzerPageSlice = createSlice({
	name: 'resumeAnalyzerPage',
	initialState,
	reducers: {
		setResumeAnalysis: (state, action: PayloadAction<ResumeAnalyzeByPortraitResponse>) => {
			state.data = action.payload;
		},
		setFileName: (state, action: PayloadAction<string>) => {
			state.fileName = action.payload;
		},
		setUploadedAt: (state, action: PayloadAction<string>) => {
			state.uploadedAt = action.payload;
		},
		resetResumeAnalyzerState: () => initialState,
	},
});

export const { reducer: resumeAnalyzerPageReducer, actions: resumeAnalyzerPageActions } =
	resumeAnalyzerPageSlice;
