import { baseApi } from '@/shared/config/api/baseApi';

import { Question } from '../model/types/question';

export const questionApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getQuestion: builder.query<Question, number>({
			query: (id) => `questions/${id}`,
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
