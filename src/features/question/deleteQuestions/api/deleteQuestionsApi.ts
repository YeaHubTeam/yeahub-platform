import { baseApi } from '@/shared/config/api/baseApi';
import { route } from '@/shared/helpers/route';

import { Question } from '@/entities/question';

import { deleteQuestionsApiUrls } from '../model/constants/deleteQuestionsConstants';

export const deleteQuestionsApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		deleteQuestion: build.mutation<void, Question['id']>({
			query: (questionId) => ({
				url: route(deleteQuestionsApiUrls.deleteQuestion, questionId),
				method: 'DELETE',
			}),
		}),
	}),
});
