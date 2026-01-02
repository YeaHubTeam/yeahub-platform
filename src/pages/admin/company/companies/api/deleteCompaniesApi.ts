import { baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { Company } from '@/entities/company';

import { deleteCompaniesApiUrls } from '../lib/constants/deleteCompaniesConstants';

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
