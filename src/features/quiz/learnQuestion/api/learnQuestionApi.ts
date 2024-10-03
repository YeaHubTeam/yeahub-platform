import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { toast } from '@/shared/ui/Toast';

import { LearnQuestionParams, LearnQuestionResponse } from '../model/types/learnQuestionTypes';

const learnQuestionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		learnQuestion: build.mutation<LearnQuestionResponse, LearnQuestionParams>({
			query: (body) => ({
				url: `/interview-preparation`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: [ApiTags.INTERVIEW_QUIZ],
			async onQueryStarted() {
				try {
					toast.success('Вопрос успешно обновлён');
				} catch (error) {
					toast.error('Не удалось обновить вопрос');
					console.log(error);
				}
			},
		}),
	}),
});

export const { useLearnQuestionMutation } = learnQuestionApi;
