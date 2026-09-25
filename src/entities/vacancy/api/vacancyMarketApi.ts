import { ApiTags, baseApi } from '@/shared/config';

import { vacancyMarketApiUrls } from '../model/constants/vacancyMarket';
import {
	VacancyMarketOverview,
	VacancyMarketSpecializationById,
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
		getVacancyMarketById: build.query<VacancyMarketSpecializationById, string>({
			query: (id) => ({
				url: vacancyMarketApiUrls.getVacancyMarketById(id),
				method: 'GET',
			}),
		}),
	}),
});

export const { useGetVacancyMarketOverviewQuery, useGetVacancyMarketByIdQuery } = vacancyMarketApi;
