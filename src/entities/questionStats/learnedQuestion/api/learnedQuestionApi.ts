import { baseApi } from '@/shared/config/api/baseApi';

import { learnedQuestionApiUrls } from '../model/constants';
import { LearnedQuestionsParamsRequest, LearnedQuestionsResponse } from '../model/types';

const learnedQuestionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getLearnedQuestionsBySkill: build.query<
			LearnedQuestionsResponse,
			LearnedQuestionsParamsRequest
		>({
			query: (params) => ({
				url: learnedQuestionApiUrls.getLearnedQuestions,
				params,
			}),
		}),
	}),
});

export const { useGetLearnedQuestionsBySkillQuery } = learnedQuestionApi;
