import { ApiTags, baseApi } from '@/shared/config';

import { vacanciesMarketApiUrls } from '../model/constants/vacanciesMarket';
import { VacanciesMarketOverview } from '../model/types/vacanciesMarket';

const vacanciesMarketApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getVacanciesMarketOverview: build.query<VacanciesMarketOverview, void>({
			query: () => ({
				url: vacanciesMarketApiUrls.overview,
				method: 'GET',
			}),
			providesTags: [ApiTags.VACANCIES_MARKET],
		}),
	}),
});

export const { useGetVacanciesMarketOverviewQuery } = vacanciesMarketApi;
