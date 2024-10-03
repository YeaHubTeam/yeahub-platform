import { baseApi } from '@/shared/config/api/baseApi';
import { toast } from '@/shared/ui/Toast';

import {
	ResetQuestionStudyProgressParams,
	ResetQuestionStudyProgressResponse,
} from '../model/types/resetQuestionStudyProgressTypes';

const resetQuestionProgressApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		resetQuestionProgress: build.mutation<
			ResetQuestionStudyProgressResponse,
			ResetQuestionStudyProgressParams
		>({
			query: ({ profileId, questionId }) => ({
				url: `/interview-preparation/learn/${profileId}/reset/${questionId}`,
				method: 'PUT',
			}),
			async onQueryStarted() {
				try {
					toast.success('Прогресс изучения вопроса сброшен');
				} catch (error) {
					toast.error('Не удалось сбросить прогресс изучения вопроса');
					console.log(error);
				}
			},
		}),
	}),
});

export const { useResetQuestionProgressMutation } = resetQuestionProgressApi;
