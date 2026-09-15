import { State } from '@/shared/config';

import { resumeAnalysis } from '../__mock__/resumeAnalysis';

import {
	getResumeAnalysis,
	getResumeFileName,
	getResumeUploadedAt,
} from './resumeAnalyzerPageSelectors';

describe('resumeAnalyzerPageSelectors', () => {
	describe('getResumeAnalysis', () => {
		test('have value', () => {
			const state: DeepPartial<State> = {
				resumeAnalyzerPage: { data: resumeAnalysis },
			};

			expect(getResumeAnalysis(state as State)).toEqual(resumeAnalysis);
		});

		test('empty value', () => {
			const state: DeepPartial<State> = {
				resumeAnalyzerPage: { data: null },
			};

			expect(getResumeAnalysis(state as State)).toBeNull();
		});
	});

	describe('getResumeFileName', () => {
		test('have value', () => {
			const fileName = 'resume.pdf';

			const state: DeepPartial<State> = {
				resumeAnalyzerPage: { fileName },
			};

			expect(getResumeFileName(state as State)).toBe(fileName);
		});

		test('empty value', () => {
			const state: DeepPartial<State> = {
				resumeAnalyzerPage: { fileName: '' },
			};

			expect(getResumeFileName(state as State)).toBe('');
		});
	});

	describe('getResumeUploadedAt', () => {
		test('have value', () => {
			const uploadedAt = '2026-09-10T10:00:00Z';

			const state: DeepPartial<State> = {
				resumeAnalyzerPage: { uploadedAt },
			};

			expect(getResumeUploadedAt(state as State)).toBe(uploadedAt);
		});

		test('empty value', () => {
			const state: DeepPartial<State> = {
				resumeAnalyzerPage: { uploadedAt: null },
			};

			expect(getResumeUploadedAt(state as State)).toBeNull();
		});
	});
});
