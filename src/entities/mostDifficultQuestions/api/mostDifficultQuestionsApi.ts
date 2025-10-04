import { baseApi } from '@/shared/config/api/baseApi';
import { route } from '@/shared/helpers/route';

import { mostDifficultQuestionsApiUrls } from '../model/constants/difficultQuestions';
import {
	MostDifficultQuestionsParams,
	MostDifficultQuestionsResponse,
} from '../model/types/difficultQuestions';

export const mostDifficultQuestionsApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getMostDifficultQuestions: build.query<
			MostDifficultQuestionsResponse[],
			MostDifficultQuestionsParams
		>({
			query: ({ specId }) => ({
				url: route(mostDifficultQuestionsApiUrls.getMostDifficultQuestions, specId),
			}),
		}),
	}),
});

export const { useGetMostDifficultQuestionsQuery } = mostDifficultQuestionsApi;
