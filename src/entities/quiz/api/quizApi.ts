import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { Response } from '@/shared/types/types';

import { setActiveQuiz } from '../model/slices/activeQuizSlice';
import {
	CreateNewQuizGetRequest,
	ExtraArgument,
	InterviewQuizGetRequest,
	NewQuizResponse,
	QuizHistoryRequest,
	QuizHistoryResponse,
} from '../model/types/quiz';
import { getActiveQuizQuestions } from '../utils/getActiveQuizQuestions';

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
		getActiveQuiz: build.query<Response<NewQuizResponse[]>, InterviewQuizGetRequest>({
			query: ({ profileId, params }) => ({
				url: `/interview-preparation/quizzes/active/${profileId}`,
				params,
			}),
			providesTags: [ApiTags.INTERVIEW_QUIZ],
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const result = await queryFulfilled;
					dispatch(setActiveQuiz(getActiveQuizQuestions(result.data?.data[0])));
				} catch (error) {
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),

		getHistoryQuiz: build.query<Response<QuizHistoryResponse[]>, QuizHistoryRequest>({
			query: ({ profileID, params }) => {
				return {
					url: `/interview-preparation/quizzes/history/${profileID}`,
					params,
				};
			},
			providesTags: [ApiTags.HISTORY_QUIZ],
		}),
	}),
	overrideExisting: true,
});

export const { useLazyCreateNewQuizQuery, useGetActiveQuizQuery, useGetHistoryQuizQuery } = quizApi;
