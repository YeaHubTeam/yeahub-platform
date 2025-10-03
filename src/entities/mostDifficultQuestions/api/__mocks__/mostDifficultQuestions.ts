import { http, HttpResponse } from 'msw';

import { mostDifficultQuestionsApiUrls } from '../../model/constants/difficultQuestions';
import { MostDifficultQuestionsResponse } from '../../model/types/difficultQuestions';

import { mostDifficultQuestions } from './data';

export const mostDifficultQuestionsMock = http.get<
	never,
	undefined,
	MostDifficultQuestionsResponse
>(
	process.env.API_URL + mostDifficultQuestionsApiUrls.getMostDifficultQuestionsBySpecializationId,
	() => {
		return HttpResponse.json<MostDifficultQuestionsResponse>(mostDifficultQuestions);
	},
);
