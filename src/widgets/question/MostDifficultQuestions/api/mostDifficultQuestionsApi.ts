import { baseApi } from '@/shared/config/api/baseApi';
import { route } from '@/shared/helpers/route';

import { mostDifficultQuestionsApiUrls } from '../model/constants/questions';
import {
	MostDifficultQuestionsParams,
	MostDifficultQuestionsResponse,
} from '../model/types/questions';

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
