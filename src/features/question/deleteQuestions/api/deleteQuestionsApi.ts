import { baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { Question } from '@/entities/question';

import { deleteQuestionsApiUrls } from '../model/constants/deleteQuestionsConstants';

export const deleteQuestionsApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		deleteQuestionOfMultiply: build.mutation<void, Question['id']>({
			query: (questionId) => ({
				url: route(deleteQuestionsApiUrls.deleteQuestion, questionId),
				method: 'DELETE',
			}),
		}),
	}),
});
