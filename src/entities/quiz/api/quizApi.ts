import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { ROUTES } from '@/shared/config/router/routes';
import { getFromLS, getJSONFromLS } from '@/shared/helpers/manageLocalStorage';
import { route } from '@/shared/helpers/route';
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
					typedExtra.navigate(ROUTES.interview.quiz.new.page);
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

		getHistoryQuiz: build.query<
			Response<QuizHistoryResponse[]>,
			QuizHistoryRequest & { uniqueKey: string }
		>({
			query: ({ profileID, params }) => {
				return {
					url: `/interview-preparation/quizzes/history/${profileID}`,
					params,
				};
			},
			serializeQueryArgs: ({ endpointName, queryArgs }) => {
				return endpointName + queryArgs.uniqueKey;
			},
			merge: (currentCache, newItems) => {
				return {
					...currentCache,
					data: [...(currentCache.data ?? []), ...newItems.data],
				};
			},
			forceRefetch({ currentArg, previousArg }) {
				return (
					currentArg?.uniqueKey !== previousArg?.uniqueKey ||
					JSON.stringify(currentArg?.params) !== JSON.stringify(previousArg?.params)
				);
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
			invalidatesTags: [ApiTags.HISTORY_QUIZ, ApiTags.INTERVIEW_QUIZ],
			async onQueryStarted(arg, { queryFulfilled, extra, dispatch }) {
				try {
					await queryFulfilled;
					dispatch(clearActiveQuizState());

					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(route(ROUTES.interview.history.result.page, arg.id));
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
