import { ApiTags, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { vacancyApiUrls } from '../model/constants/vacancyConstants';
import {
	GetVacanciesListParamsRequest,
	GetVacanciesListResponse,
	GetVacancyByIdResponse,
} from '../model/types/vacancy';

export const vacancyApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getVacanciesList: build.query<GetVacanciesListResponse, GetVacanciesListParamsRequest>({
			query: (params) => ({
				url: vacancyApiUrls.getVacanciesList,
				params: { page: 1, limit: 10, ...params },
			}),
			providesTags: [ApiTags.VACANCIES],
		}),
		getVacancyById: build.query<GetVacancyByIdResponse, string>({
			query: (vacancyId) => ({
				url: route(vacancyApiUrls.getVacancyById, vacancyId || ''),
			}),
			providesTags: [ApiTags.VACANCY_DETAIL],
		}),
	}),
});

export const { useGetVacancyByIdQuery, useGetVacanciesListQuery } = vacancyApi;
