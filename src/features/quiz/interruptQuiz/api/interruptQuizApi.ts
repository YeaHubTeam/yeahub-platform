import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { ExtraArgument } from '@/shared/config/store/types';
import { route } from '@/shared/helpers/route';
import { toast } from '@/shared/ui/Toast';

import { clearActiveQuizState } from '@/entities/quiz';

import { interruptQuizApiUrls } from '../model/constants/interruptQuizConstants';
import { InterruptQuizRequest } from '../model/types/interruptQuizTypes';

const interruptQuizApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		interruptQuiz: build.mutation<boolean, InterruptQuizRequest>({
			query: (body) => {
				return {
					url: interruptQuizApiUrls.interruptQuiz,
					method: 'POST',
					body,
					params: {
						isInterrupted: true,
					},
				};
			},
			invalidatesTags: [
				ApiTags.HISTORY_QUIZ,
				ApiTags.INTERVIEW_STATISTICS,
				ApiTags.INTERVIEW_QUIZ,
				ApiTags.QUESTIONS_LEARNED,
			],
			async onQueryStarted(body, { queryFulfilled, extra, dispatch }) {
				try {
					await queryFulfilled;
					dispatch(clearActiveQuizState(body.profileId));
					const typedExtra = extra as ExtraArgument;
					toast.success(i18n.t(Translation.TOAST_INTERVIEW_FINISH_SUCCESS));
					typedExtra.navigate(route(ROUTES.interview.page));
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_INTERVIEW_FINISH_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
	}),
});

export const { useInterruptQuizMutation } = interruptQuizApi;
