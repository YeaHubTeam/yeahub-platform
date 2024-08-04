import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { Response } from '@/shared/types/types';

import { CreateNewQuizGetRequest, NewQuizResponse } from '../model/types/quiz';

const quizApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createNewQuiz: build.query<Response<NewQuizResponse>, CreateNewQuizGetRequest>({
			query: ({ profileId, params }) => {
				return {
					url: `/interview-preparation/quizzes/new/${profileId}`,
					params,
				};
			},
			providesTags: [ApiTags.NEW_QUIZ],
		}),
	}),
});

export const { useLazyCreateNewQuizQuery } = quizApi;
