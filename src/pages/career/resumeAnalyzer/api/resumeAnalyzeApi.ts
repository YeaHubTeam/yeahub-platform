import toast from 'react-hot-toast';

import { ApiTags, baseApi, i18n } from '@/shared/config';
import { route, setToLS } from '@/shared/libs';
import { LS_RESUME_ANALYSIS_KEY } from '@/shared/libs';

import { resumeAnalyzeApiUrls } from '../model/constants/resumeAnalyzerConstants';
import { resumeAnalyzerPageActions } from '../model/slices/resumeAnalyzerPageSlice';
import {
	ResumeAnalyzeByPortraitBodyRequest,
	ResumeAnalyzeByPortraitResponse,
} from '../model/types/resumeAnalyzer';

export const resumeAnalyzeApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		resumeAnalyzeByPortrait: build.mutation<
			ResumeAnalyzeByPortraitResponse,
			ResumeAnalyzeByPortraitBodyRequest
		>({
			query: ({ specializationId, file }) => {
				return {
					url: route(resumeAnalyzeApiUrls.resumeAnalyzeByPortrait, specializationId),
					method: 'POST',
					body: file,
				};
			},

			async onQueryStarted(_, { queryFulfilled, dispatch }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(resumeAnalyzerPageActions.setResumeAnalysis(data));

					setToLS(LS_RESUME_ANALYSIS_KEY, {
						response: data,
						analyzedAt: new Date().toISOString(),
					});
				} catch {
					toast.error(i18n.t('file.uploaded_resume.analyses.failed'));
				}
			},

			invalidatesTags: [ApiTags.RESUME_ATS],
		}),
	}),
});

export const { useResumeAnalyzeByPortraitMutation } = resumeAnalyzeApi;
