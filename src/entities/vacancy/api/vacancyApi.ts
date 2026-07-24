import { baseApi } from '@/shared/config';

import { vacanciesApiUrls } from '../model/constants/vacancyConstants';
import type {
	GetVacanciesListParamsRequest,
	GetVacanciesListResponse,
} from '../model/types/vacancy';

export const vacancyApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getVacancies: build.query<GetVacanciesListResponse, GetVacanciesListParamsRequest>({
			query: (params) => ({
				url: vacanciesApiUrls.getVacancies,
				method: 'GET',
				params,
			}),
		}),
	}),
});

export const { useGetVacanciesQuery } = vacancyApi;
