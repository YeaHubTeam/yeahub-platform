import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { route } from '@/shared/helpers/route';

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
	}),
});

export const { useGetCompanyByIdQuery, useGetCompaniesListQuery } = companyApi;
