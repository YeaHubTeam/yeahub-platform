import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';

const learnQuestionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		learnQuestion: build.mutation<
			boolean,
			{ profileId: string; questionId: number; isLearned: boolean }
		>({
			query: ({ profileId, questionId, isLearned }) => ({
				url: `/interview-preparation`,
				method: 'PUT',
				body: {
					profileId,
					questionId,
					isLearned,
				},
			}),
			invalidatesTags: [ApiTags.INTERVIEW_QUIZ],
		}),
	}),
});

export const { useLearnQuestionMutation } = learnQuestionApi;
