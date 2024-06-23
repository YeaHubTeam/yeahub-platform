import { baseApi } from '@/shared/config/api/baseApi';

import { Question } from '../model/types/question';

export const questionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getQuestion: build.query<Question, number>({
			query: (id) => `https://api.test.yeahub.ru/questions/${id}`,
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					const result = await queryFulfilled;
					console.log(result.data);
				} catch (error) {
					console.log(error);
				}
			},
		}),
	}),
});

export const { useGetQuestionQuery } = questionApi;
