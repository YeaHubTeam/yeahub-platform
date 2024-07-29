import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { Response } from '@/shared/types/types';

import { CreateNewQuizGetRequest, NewQuizResponse } from '../model/types/quiz';

const quizApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createNewQuiz: build.query<Response<NewQuizResponse>, CreateNewQuizGetRequest>({
			query: ({ profileId, skills, params }) => {
				const skillsParams = skills.map((skill, index) => `skills[${index}]=${skill}`).join('&');
				const otherParams = new URLSearchParams({
					minComplexity: `${params.minComplexity}`,
					maxComplexity: `${params.maxComplexity}`,
					limit: `${params.limit}`,
					mode: params.mode,
				}).toString();
				return {
					url: `/interview-preparation/quizzes/new/${profileId}?${skillsParams}&${otherParams}`,
				};
			},
			providesTags: [ApiTags.NEW_QUIZ],
		}),
	}),
});

export const { useLazyCreateNewQuizQuery } = quizApi;
