import { ApiTags, baseApi } from '@/shared/config';

import { companyApiUrls } from '../model/constants/companyConstants';
import {
	GetCompaniesListParamsRequest,
	GetCompaniesListResponse,
} from '../model/types/companyTypes';

const companyApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getCompaniesList: build.query<GetCompaniesListResponse, GetCompaniesListParamsRequest>({
			query: (params) => ({
				url: companyApiUrls.getCompaniesList,
				params,
			}),
			providesTags: [ApiTags.COMPANIES],
		}),
		getPublicCompaniesList: build.query<GetCompaniesListResponse, GetCompaniesListParamsRequest>({
			query: (params) => ({
				url: companyApiUrls.getPublicCompaniesList,
				params,
			}),
			providesTags: [ApiTags.PUBLIC_COMPANIES],
		}),
	}),
});

export const { useGetCompaniesListQuery, useGetPublicCompaniesListQuery } = companyApi;
