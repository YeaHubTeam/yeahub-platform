import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { ExtraArgument } from '@/shared/config/store/types';
import { getJSONFromLS } from '@/shared/helpers/manageLocalStorage';
import { route } from '@/shared/helpers/route';
import { Response } from '@/shared/types/types';
import { toast } from '@/shared/ui/Toast';

import { LS_ACTIVE_QUIZ_KEY, quizApiUrls } from '../model/constants/quizConstants';
import { clearActiveQuizState, setActiveQuizQuestions } from '../model/slices/activeQuizSlice';
import {
	CreateNewQuizParamsRequest,
	CreateNewQuizResponse,
	GetActiveQuizParamsRequest,
	GetActiveQuizResponse,
	GetProfileQuizStatsResponse,
	GetQuizByProfileIdParamsRequest,
	GetQuizByProfileIdResponse,
	GetQuizHistoryParamsRequest,
	GetQuizHistoryResponse,
} from '../model/types/quiz';
import { getActiveQuizQuestions } from '../utils/getActiveQuizQuestions';

const quizApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createNewQuiz: build.query<Response<CreateNewQuizResponse>, CreateNewQuizParamsRequest>({
			query: ({ profileId, ...params }) => {
				return {
					url: route(quizApiUrls.createNewQuiz, profileId),
					params,
				};
			},
			providesTags: [ApiTags.NEW_QUIZ],
			async onQueryStarted(_, { queryFulfilled, extra, dispatch }) {
				try {
					await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					toast.success(i18n.t(Translation.TOAST_INTERVIEW_NEW_QUIZ_SUCCESS));
					typedExtra.navigate(ROUTES.interview.new.page);
					dispatch(baseApi.util.invalidateTags([ApiTags.HISTORY_QUIZ, ApiTags.INTERVIEW_QUIZ]));
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_INTERVIEW_NEW_QUIZ_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
		getActiveQuiz: build.query<GetActiveQuizResponse, GetActiveQuizParamsRequest>({
			query: ({ profileId, ...params }) => ({
				url: route(quizApiUrls.getActiveQuiz, profileId),
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
			GetQuizHistoryResponse,
			GetQuizHistoryParamsRequest & { uniqueKey: string }
		>({
			query: ({ profileId, ...params }) => {
				return {
					url: route(quizApiUrls.getHistoryQuiz, profileId),
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
					JSON.stringify(currentArg) !== JSON.stringify(previousArg)
				);
			},
			providesTags: [ApiTags.HISTORY_QUIZ],
		}),
		saveQuizResult: build.mutation<boolean, CreateNewQuizResponse>({
			query: (data) => {
				return {
					url: quizApiUrls.saveQuizResult,
					method: 'POST',
					body: data,
				};
			},
			invalidatesTags: [ApiTags.HISTORY_QUIZ, ApiTags.INTERVIEW_QUIZ, ApiTags.INTERVIEW_STATISTICS],
			async onQueryStarted(arg, { queryFulfilled, extra, dispatch }) {
				try {
					await queryFulfilled;
					dispatch(clearActiveQuizState());

					const typedExtra = extra as ExtraArgument;
					toast.success(i18n.t(Translation.TOAST_INTERVIEW_FINISH_SUCCESS));
					typedExtra.navigate(route(ROUTES.interview.history.result.page, arg.id));
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_INTERVIEW_FINISH_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
		getQuizByProfileId: build.query<GetQuizByProfileIdResponse, GetQuizByProfileIdParamsRequest>({
			query: ({ profileId, quizId }) => {
				return {
					url: route(quizApiUrls.getQuizByProfileId, profileId, quizId),
				};
			},
		}),
		getProfileQuizStats: build.query<GetProfileQuizStatsResponse, string>({
			query: (profileId) => {
				return {
					url: route(quizApiUrls.getProfileQuizStats, profileId),
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
	useGetQuizByProfileIdQuery,
	useGetProfileQuizStatsQuery,
} = quizApi;
