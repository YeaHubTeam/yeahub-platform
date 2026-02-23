import { DefaultBodyType, http, HttpResponse } from 'msw';

import { hhApiUrls } from '../../model/constants/hhConstants';
import { GetHhAnalyticsItemResponse } from '../../model/types/hh';

import { hhAnalyticsMockData } from './data';

export const hhAnalyticsMock = http.get<
	Record<string, string>,
	DefaultBodyType,
	GetHhAnalyticsItemResponse
>(process.env.API_URL + hhApiUrls.getHhTopBySpec, () => {
	return HttpResponse.json(hhAnalyticsMockData);
});
