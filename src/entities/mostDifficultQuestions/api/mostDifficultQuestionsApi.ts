import { baseApi } from '@/shared/config/api/baseApi';
import { route } from '@/shared/helpers/route';

import { mostDifficultQuestionsApiUrls } from '../model/constants/difficultQuestions';
import { MostDifficultQuestionsResponse } from '../model/types/difficultQuestions';

export const mostDifficultQuestionsApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getMostDifficultQuestionsBySpecializationId: build.query<
			MostDifficultQuestionsResponse,
			{ specId: number }
		>({
			query: ({ specId }) => ({
				url: route(
					mostDifficultQuestionsApiUrls.getMostDifficultQuestionsBySpecializationId,
					specId,
				),
			}),
		}),
	}),
});

export const { useGetMostDifficultQuestionsBySpecializationIdQuery } = mostDifficultQuestionsApi;
