import { baseApi } from '@/shared/config/api/baseApi';

import {
	ResetQuestionStudyProgressParams,
	ResetQuestionStudyProgressResponse,
} from '../model/types/resetQuestionStudyProgressTypes';

const resetQuestionProgressApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		resetQuestionProgress: build.mutation<
			ResetQuestionStudyProgressResponse,
			ResetQuestionStudyProgressParams
		>({
			query: ({ profileId, questionId }) => ({
				url: `/interview-preparation/learn/${profileId}/reset/${questionId}`,
				method: 'PUT',
			}),
		}),
	}),
});

export const { useResetQuestionProgressMutation } = resetQuestionProgressApi;
