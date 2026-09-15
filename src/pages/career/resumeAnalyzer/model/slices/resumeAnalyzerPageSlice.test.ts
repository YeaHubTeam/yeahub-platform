import { resumeAnalysis } from '../__mock__/resumeAnalysis';
import { ResumeAnalyzerPageState } from '../types/resumeAnalyzer';

import {
	initialState,
	resumeAnalyzerPageActions,
	resumeAnalyzerPageReducer,
} from './resumeAnalyzerPageSlice';

describe('resumeAnalyzerPageSlice', () => {
	test('set resume analysis', () => {
		const state: ResumeAnalyzerPageState = {
			data: null,
			fileName: '',
			uploadedAt: null,
		};

		expect(
			resumeAnalyzerPageReducer(state, resumeAnalyzerPageActions.setResumeAnalysis(resumeAnalysis)),
		).toEqual({
			data: resumeAnalysis,
			fileName: '',
			uploadedAt: null,
		});
	});

	test('set file name', () => {
		const state: ResumeAnalyzerPageState = {
			data: null,
			fileName: '',
			uploadedAt: null,
		};

		expect(
			resumeAnalyzerPageReducer(state, resumeAnalyzerPageActions.setFileName('resume.pdf')),
		).toEqual({
			data: null,
			fileName: 'resume.pdf',
			uploadedAt: null,
		});
	});

	test('set uploaded at', () => {
		const state: ResumeAnalyzerPageState = {
			data: null,
			fileName: '',
			uploadedAt: null,
		};

		expect(
			resumeAnalyzerPageReducer(
				state,
				resumeAnalyzerPageActions.setUploadedAt('2026-09-10T10:00:00Z'),
			),
		).toEqual({
			data: null,
			fileName: '',
			uploadedAt: '2026-09-10T10:00:00Z',
		});
	});

	test('reset resume analyzer state', () => {
		const state: ResumeAnalyzerPageState = {
			data: resumeAnalysis,
			fileName: 'resume.pdf',
			uploadedAt: '2026-09-10T10:00:00Z',
		};

		expect(
			resumeAnalyzerPageReducer(state, resumeAnalyzerPageActions.resetResumeAnalyzerState()),
		).toEqual(initialState);
	});
});
