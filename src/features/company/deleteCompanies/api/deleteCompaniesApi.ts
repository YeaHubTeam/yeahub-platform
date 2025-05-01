import { baseApi } from '@/shared/config/api/baseApi';
import { route } from '@/shared/helpers/route';

import { Company } from '@/entities/company';

import { deleteCompaniesApiUrls } from '../model/constants/deleteCompaniesConstants';

export const deleteCompaniesApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		deleteCompanyOfMultiply: build.mutation<void, Company['id']>({
			query: (companyId) => ({
				url: route(deleteCompaniesApiUrls.deleteCompany, companyId),
				method: 'DELETE',
			}),
		}),
	}),
});
