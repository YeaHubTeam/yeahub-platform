import { ApiTags, baseApi } from '@/shared/config';

import { vacancyApiUrls } from '../model/constants/vacancy';
import { GetVacanciesListParamsRequest, GetVacanciesListResponse } from '../model/types/vacancy';

const vacancyApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getVacanciesList: build.query<GetVacanciesListResponse, GetVacanciesListParamsRequest>({
			query: (params) => ({
				url: vacancyApiUrls.getVacanciesList,
				params: { page: 1, limit: 10, ...params },
			}),
			providesTags: [ApiTags.VACANCIES],
		}),
	}),
});
export const { useGetVacanciesListQuery } = vacancyApi;
