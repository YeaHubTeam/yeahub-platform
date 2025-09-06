import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { State } from '@/shared/config/store/State';
import { ExtraArgument } from '@/shared/config/store/types';
import { route } from '@/shared/helpers/route';
import { toast } from '@/shared/ui/Toast';

import { clearActiveQuizState } from '@/entities/quiz';

import { cloneQuizApiUrls } from '../model/constants/cloneQuizConstants';
import { CloneQuizResponse } from '../model/types/cloneQuizTypes';

const cloneQuizApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		cloneQuiz: build.query<CloneQuizResponse, string>({
			query: (quizId) => {
				return {
					url: route(cloneQuizApiUrls.cloneQuiz, quizId),
				};
			},
			providesTags: [ApiTags.NEW_QUIZ],
			async onQueryStarted(_, { queryFulfilled, extra, dispatch, getState }) {
				try {
					await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					const state = getState() as State;
					const profileId = state.profile.fullProfile?.activeProfile.id || '';

					if (profileId) {
						dispatch(clearActiveQuizState(profileId));
					}
					toast.success(i18n.t(Translation.TOAST_INTERVIEW_NEW_QUIZ_SUCCESS));
					typedExtra.navigate(ROUTES.interview.quiz.page);

					dispatch(baseApi.util.invalidateTags([ApiTags.INTERVIEW_QUIZ, ApiTags.HISTORY_QUIZ]));
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_INTERVIEW_NEW_QUIZ_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
	}),
});

export const { useLazyCloneQuizQuery } = cloneQuizApi;
