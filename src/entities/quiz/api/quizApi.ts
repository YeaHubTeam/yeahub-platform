import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { Response } from '@/shared/types/types';

import {
	CreateNewQuizGetRequest,
	ExtraArgument,
	InterviewQuizGetRequest,
	NewQuizResponse,
} from '../model/types/quiz';

const quizApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createNewQuiz: build.query<Response<NewQuizResponse>, CreateNewQuizGetRequest>({
			query: ({ profileId, params }) => {
				return {
					url: `/interview-preparation/quizzes/new/${profileId}`,
					params,
				};
			},
			providesTags: [ApiTags.NEW_QUIZ],
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					await queryFulfilled;

					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate('interviewQuiz');
				} catch (error) {
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
		getActiveQuizzes: build.query<Response<NewQuizResponse[]>, InterviewQuizGetRequest>({
			query: ({ profileId, params }) => ({
				url: `/interview-preparation/quizzes/active/${profileId}`,
				params,
			}),
			providesTags: [ApiTags.INTERVIEW_QUIZ],
		}),
	}),
});

export const { useLazyCreateNewQuizQuery, useGetActiveQuizzesQuery } = quizApi;