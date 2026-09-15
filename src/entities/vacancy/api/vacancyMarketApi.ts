import { ApiTags, baseApi } from '@/shared/config';

import { vacancyMarketApiUrls } from '../model/constants/vacancyMarket';
import {
	VacancyMarketSpecializationItem,
	VacancyMarketOverview,
} from '../model/types/vacancyMarket';

const vacancyMarketApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getVacancyMarketOverview: build.query<VacancyMarketOverview, void>({
			query: () => ({
				url: vacancyMarketApiUrls.getVacancyMarketOverview,
				method: 'GET',
			}),
			providesTags: [ApiTags.VACANCIES_MARKET],
		}),
		getVacancyMarketSpecializations: build.query<VacancyMarketSpecializationItem[], void>({
			query: () => ({
				url: vacancyMarketApiUrls.getVacancyMarketSpecializations,
				method: 'GET',
			}),
			providesTags: [ApiTags.VACANCIES_MARKET],
		}),
	}),
});

export const { useGetVacancyMarketOverviewQuery, useGetVacancyMarketSpecializationsQuery } =
	vacancyMarketApi;
