import { http, HttpResponse } from 'msw';

import { vacancyMarketApiUrls } from '../../model/constants/vacancyMarket';

import { vacancyOverviewMockData } from './data';

export const vacancyMarketMock = http.get(
	process.env.API_URL + vacancyMarketApiUrls.getVacancyMarketOverview,
	() => {
		return HttpResponse.json(vacancyOverviewMockData);
	},
);
