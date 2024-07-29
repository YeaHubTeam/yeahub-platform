import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { Response } from '@/shared/types/types';

import { CreateNewQuizParams, NewQuizResponse } from '../model/types/quiz';

const quizApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createNewQuiz: build.query<Response<NewQuizResponse>, CreateNewQuizParams>({
			query: (params) => ({
				url: '/interview-preparation/quizzes/new/',
				params,
			}),
			providesTags: [ApiTags.NEW_QUIZ],
		}),
	}),
});

export const { useLazyCreateNewQuizQuery } = quizApi;
