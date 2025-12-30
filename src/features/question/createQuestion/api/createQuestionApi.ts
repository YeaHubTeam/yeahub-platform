import { i18n, Translation, ApiTags, baseApi, ROUTES, ExtraArgument } from '@/shared/config';
import { route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { createQuestionApiUrls } from '../model/constants/createQuestionConstants';
import {
	CreateQuestionBodyRequest,
	CreateQuestionResponse,
} from '../model/types/questionCreateTypes';

export const createQuestionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createQuestion: build.mutation<CreateQuestionResponse, CreateQuestionBodyRequest>({
			query: (question) => ({
				url: createQuestionApiUrls.createQuestion,
				method: 'POST',
				body: question,
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					const result = await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(route(ROUTES.admin.questions.details.page, result.data.id));
					toast.success(i18n.t(Translation.TOAST_QUESTION_CREATE_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_QUESTION_CREATE_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.QUESTIONS],
		}),
	}),
});

export const { useCreateQuestionMutation } = createQuestionApi;
