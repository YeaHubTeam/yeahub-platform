import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { getFromLS, getJSONFromLS } from '@/shared/helpers/manageLocalStorage';
import { Response } from '@/shared/types/types';

import { LS_ACTIVE_QUIZ_KEY, LS_START_DATE_QUIZ_KEY } from '../model/constants/quizConstants';
import {
	clearActiveQuizState,
	setActiveQuizQuestions,
	setStartDate,
} from '../model/slices/activeQuizSlice';
import {
	ActiveQuizWithDate,
	CreateNewQuizGetRequest,
	ExtraArgument,
	InterviewQuizGetRequest,
	NewQuizResponse,
	Quiz,
	QuizByIdRequestParams,
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
					const localStartDate = getFromLS(LS_START_DATE_QUIZ_KEY);
					const localActiveQuiz = getJSONFromLS(LS_ACTIVE_QUIZ_KEY);

					dispatch(setStartDate(localStartDate ?? new Date().toISOString()));
					dispatch(
						setActiveQuizQuestions(localActiveQuiz ?? getActiveQuizQuestions(result.data?.data[0])),
					);
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
			async onQueryStarted(arg, { queryFulfilled, extra, dispatch }) {
				try {
					await queryFulfilled;
					dispatch(clearActiveQuizState());

					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(`/interview/quiz/${arg.id}`);
				} catch (error) {
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.INTERVIEW_QUIZ],
		}),
		getQuizById: build.query<Quiz, QuizByIdRequestParams>({
			query: (params) => {
				const { profileId, quizId } = params ?? {};
				return {
					url: `interview-preparation/quizzes/history/${profileId}/${quizId}`,
				};
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
	useGetQuizByIdQuery,
} = quizApi;
