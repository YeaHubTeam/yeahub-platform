import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { Response } from '@/shared/types/types';

import { setActiveQuizQuestions, setStartDate } from '../model/slices/activeQuizSlice';
import {
	ActiveQuizWithDate,
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
					dispatch(setStartDate(new Date().toISOString()));
					dispatch(setActiveQuizQuestions(getActiveQuizQuestions(result.data?.data[0])));
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

		saveQuizResult: build.mutation<boolean, ActiveQuizWithDate>({
			query: (data) => {
				return {
					url: '/interview-preparation/quizzes',
					method: 'POST',
					body: data,
				};
			},
			async onQueryStarted(arg, { queryFulfilled, extra }) {
				try {
					await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(`/interview/quiz/${arg.id}`);
				} catch (error) {
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
	}),
	overrideExisting: true,
});

export const {
	useLazyCreateNewQuizQuery,
	useGetActiveQuizQuery,
	useGetHistoryQuizQuery,
	useSaveQuizResultMutation,
} = quizApi;
