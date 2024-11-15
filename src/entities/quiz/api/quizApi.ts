import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { handleRequestToast } from '@/shared/helpers/handleRequestToast';
import { getJSONFromLS } from '@/shared/helpers/manageLocalStorage';
import { route } from '@/shared/helpers/route';
import { Response } from '@/shared/types/types';

import { LS_ACTIVE_QUIZ_KEY } from '../model/constants/quizConstants';
import { clearActiveQuizState, setActiveQuizQuestions } from '../model/slices/activeQuizSlice';
import {
	CreateNewQuizGetRequest,
	ExtraArgument,
	InterviewQuizGetRequest,
	NewQuizResponse,
	ProfileStats,
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
			async onQueryStarted(_, { queryFulfilled, extra, dispatch }) {
				const onSuccess = async () => {
					await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(ROUTES.interview.new.page);
					dispatch(baseApi.util.invalidateTags([ApiTags.HISTORY_QUIZ, ApiTags.INTERVIEW_QUIZ]));
				};
				handleRequestToast({
					onSuccess,
					successMessage: Translation.TOAST_INTERVIEW_NEW_QUIZ_SUCCESS,
					failedMessage: Translation.TOAST_INTERVIEW_NEW_QUIZ_FAILED,
				});
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
					const localActiveQuiz = getJSONFromLS(LS_ACTIVE_QUIZ_KEY);

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
		saveQuizResult: build.mutation<boolean, NewQuizResponse>({
			query: (data) => {
				return {
					url: '/interview-preparation/quizzes',
					method: 'POST',
					body: data,
				};
			},
			invalidatesTags: [ApiTags.HISTORY_QUIZ, ApiTags.INTERVIEW_QUIZ, ApiTags.INTERVIEW_STATISTICS],
			async onQueryStarted(arg, { queryFulfilled, extra, dispatch }) {
				const onSuccess = async () => {
					await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(route(ROUTES.interview.history.result.page, arg.id));
					dispatch(clearActiveQuizState());
				};
				handleRequestToast({
					onSuccess,
					successMessage: Translation.TOAST_INTERVIEW_FINISH_SUCCESS,
					failedMessage: Translation.TOAST_INTERVIEW_FINISH_FAILED,
				});
			},
		}),
		getQuizById: build.query<Quiz, QuizByIdRequestParams>({
			query: (params) => {
				const { profileId, quizId } = params ?? {};
				return {
					url: `interview-preparation/quizzes/history/${profileId}/${quizId}`,
				};
			},
		}),
		getProfileStats: build.query<ProfileStats, string>({
			query: (profileId) => {
				return {
					url: `interview-preparation/stat/${profileId}`,
				};
			},
			providesTags: [ApiTags.INTERVIEW_STATISTICS],
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
	useGetProfileStatsQuery,
} = quizApi;
