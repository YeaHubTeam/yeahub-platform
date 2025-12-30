import { i18n, Translation, ApiTags, baseApi, ROUTES, ExtraArgument } from '@/shared/config';
import { route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { Company } from '@/entities/company';

import { deleteCompanyApiUrls } from '../model/constants/deleteCompanyConstants';

const deleteCompanyApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		deleteCompany: builder.mutation<void, Company['id']>({
			query: (companyId) => ({
				url: route(deleteCompanyApiUrls.deleteCompany, companyId),
				method: 'DELETE',
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					toast.success(i18n.t(Translation.TOAST_COMPANIES_DELETE_SINGLE_SUCCESS));
					typedExtra.navigate(ROUTES.admin.companies.page);
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_COMPANIES_DELETE_SINGLE_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.COMPANIES, ApiTags.COMPANY_DETAIL],
		}),
	}),
});

export const { useDeleteCompanyMutation } = deleteCompanyApi;
