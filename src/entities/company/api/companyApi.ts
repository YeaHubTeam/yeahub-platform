import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { route } from '@/shared/helpers/route';

import { companyApiUrls } from '../model/constants/companyConstants';
import { GetCompanyByIdRequest, GetCompanyByIdResponse } from '../model/types/company';

const companyApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getCompanyById: build.query<GetCompanyByIdResponse, GetCompanyByIdRequest>({
			query: ({ companyId }) => ({
				url: route(companyApiUrls.getCompanyById, companyId),
			}),
			providesTags: [ApiTags.COMPANY_DETAIL],
		}),
	}),
});

export const { useGetCompanyByIdQuery } = companyApi;
