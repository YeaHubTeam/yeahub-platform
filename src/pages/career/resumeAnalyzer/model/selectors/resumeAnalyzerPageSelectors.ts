import { State } from '@/shared/config';

export const getResumeAnalysis = (state: State) => state.resumeAnalyzerPage.data;
export const getResumeFileName = (state: State) => state.resumeAnalyzerPage.fileName;
export const getResumeUploadedAt = (state: State) => state.resumeAnalyzerPage.uploadedAt;
