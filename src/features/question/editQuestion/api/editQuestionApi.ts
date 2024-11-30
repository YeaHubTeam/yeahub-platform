import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { ExtraArgument } from '@/shared/config/store/types';
import { route } from '@/shared/helpers/route';
import { toast } from '@/shared/ui/Toast';

import { editQuestionApiUrls } from '../model/constants/editQuestionConstants';
import {
	EditQuestionBodyRequest,
	EditQuestionResponse,
} from '../model/types/questionEditPageTypes';

const editQuestionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		editQuestion: build.mutation<EditQuestionResponse, EditQuestionBodyRequest>({
			query: (question) => ({
				url: route(editQuestionApiUrls.editQuestion, question.id),
				method: 'PATCH',
				body: question,
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					const result = await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(route(ROUTES.admin.questions.details.page, result.data.id));
					toast.success(i18n.t(Translation.TOAST_QUESTION_EDIT_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_QUESTION_EDIT_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.QUESTIONS, ApiTags.QUESTION_DETAIL],
		}),
	}),
});

export const { useEditQuestionMutation } = editQuestionApi;
