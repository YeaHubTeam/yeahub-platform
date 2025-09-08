import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { ExtraArgument } from '@/shared/config/store/types';
import { route } from '@/shared/helpers/route';
import { toast } from '@/shared/ui/Toast';

import { clearActiveQuizState } from '@/entities/quiz';

import { finishQuizApiUrls } from '../model/constants/finishQuizConstants';
import { FinishQuizRequest } from '../model/types/finishQuizTypes';

const finishQuizApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		finishQuiz: build.mutation<boolean, FinishQuizRequest>({
			query: (body) => {
				return {
					url: finishQuizApiUrls.saveQuizResult,
					method: 'POST',
					body,
				};
			},
			invalidatesTags: [ApiTags.HISTORY_QUIZ, ApiTags.INTERVIEW_QUIZ, ApiTags.INTERVIEW_STATISTICS],
			async onQueryStarted(body, { queryFulfilled, extra, dispatch }) {
				try {
					await queryFulfilled;
					dispatch(clearActiveQuizState(body.profileId));

					const typedExtra = extra as ExtraArgument;
					toast.success(i18n.t(Translation.TOAST_INTERVIEW_FINISH_SUCCESS));
					typedExtra.navigate(route(ROUTES.interview.history.result.page, body.id));
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_INTERVIEW_FINISH_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
	}),
});

export const { useFinishQuizMutation } = finishQuizApi;
