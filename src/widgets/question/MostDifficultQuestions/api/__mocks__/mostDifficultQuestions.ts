import { http, HttpResponse } from 'msw';

import { mostDifficultQuestionsApiUrls } from '../../model/constants/questions';
import { MostDifficultQuestionsResponse } from '../../model/types/questions';

import { mostDifficultQuestions } from './data';

export const mostDifficultQuestionsMock = http.get<
	never,
	undefined,
	MostDifficultQuestionsResponse[]
>(process.env.API_URL + mostDifficultQuestionsApiUrls.getMostDifficultQuestions, () => {
	return HttpResponse.json<MostDifficultQuestionsResponse[]>(mostDifficultQuestions);
});
