import { useEffect, useState } from 'react';

import {
	getJSONFromLS,
	LS_RESUME_ANALYSIS_KEY,
	useAppDispatch,
	useAppSelector,
} from '@/shared/libs';

import { getResumeAnalysis } from '../selectors/resumeAnalyzerPageSelectors';
import { resumeAnalyzerPageActions } from '../slices/resumeAnalyzerPageSlice';
import type {
	ResumeAnalyzeByPortraitResponse,
	StoredResumeAnalysis,
} from '../types/resumeAnalyzer';

const getStoredResumeAnalysis = (): ResumeAnalyzeByPortraitResponse | null => {
	try {
		const storedData = getJSONFromLS(LS_RESUME_ANALYSIS_KEY) as StoredResumeAnalysis | null;
		return storedData?.response ?? null;
	} catch {
		return null;
	}
};

export const useRestoreResumeAnalysis = () => {
	const dispatch = useAppDispatch();
	const resumeAnalysis = useAppSelector(getResumeAnalysis);
	const [storedResumeAnalysis] = useState(getStoredResumeAnalysis);

	useEffect(() => {
		if (!resumeAnalysis && storedResumeAnalysis) {
			dispatch(resumeAnalyzerPageActions.setResumeAnalysis(storedResumeAnalysis));
		}
	}, [dispatch, resumeAnalysis, storedResumeAnalysis]);

	return resumeAnalysis ?? storedResumeAnalysis;
};
