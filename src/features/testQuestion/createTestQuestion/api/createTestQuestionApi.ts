import { ApiTags, baseApi, ExtraArgument, ROUTES } from '@/shared/config';
import { route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { createTestQuestionApiUrls } from '../model/constants/createTestQuestionConstants';
import {
	CreateTestQuestionBodyRequest,
	CreateTestQuestionResponse,
} from '../model/types/testQuestionCreateTypes';

export const createTestQuestionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createTestQuestion: build.mutation<CreateTestQuestionResponse, CreateTestQuestionBodyRequest>({
			query: (testQuestion) => ({
				url: route(createTestQuestionApiUrls.createTestQuestion),
				method: 'POST',
				body: {
					...testQuestion,
					status: 'public',
				},
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					const result = await queryFulfilled;
					const typedExtra = extra as ExtraArgument;

					typedExtra.navigate(route(ROUTES.admin.testQuestions.details.page, result.data.id));

					toast.success('Тест успешно создан');
				} catch (error) {
					toast.error('Не удалось создать тест');
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.TEST_QUESTIONS],
		}),
	}),
});

export const { useCreateTestQuestionMutation } = createTestQuestionApi;
