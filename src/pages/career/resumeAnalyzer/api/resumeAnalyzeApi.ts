import { ApiTags, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { resumeAnalyzeApiUrls } from '../model/constants/resumeAnalyzeConstants';
import { ResumeAnalyzeBodyRequest, ResumeAnalyzeResponse } from '../model/types/resumeAnalyze';

export const resumeAnalyzeApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		resumeAnalyze: build.mutation<ResumeAnalyzeResponse, ResumeAnalyzeBodyRequest>({
			query: ({ specializationId, file }) => {
				return {
					url: route(resumeAnalyzeApiUrls.resumeAnalyze, specializationId),
					method: 'POST',
					body: file,
				};
			},
			invalidatesTags: [ApiTags.RESUME_ATS],
		}),
	}),
});

export const { useResumeAnalyzeMutation } = resumeAnalyzeApi;
