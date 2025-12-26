import { ApiTags, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { companyApiUrls } from '../model/constants/companyConstants';
import {
	GetCompanyByIdRequest,
	GetCompanyByIdResponse,
	GetCompaniesListParamsRequest,
	GetCompaniesListResponse,
} from '../model/types/companyTypes';

const companyApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getCompanyById: build.query<GetCompanyByIdResponse, GetCompanyByIdRequest>({
			query: ({ companyId }) => ({
				url: route(companyApiUrls.getCompanyById, companyId),
			}),
			providesTags: [ApiTags.COMPANY_DETAIL],
		}),
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

export const { useGetCompanyByIdQuery, useGetCompaniesListQuery, useGetPublicCompaniesListQuery } =
	companyApi;
