import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { ExtraArgument } from '@/shared/config/store/types';
import { route } from '@/shared/helpers/route';
import { toast } from '@/shared/ui/Toast';

import { editCompanyApiUrls } from '../model/constants/editCompanyConstants';
import { CompanyEditBodyRequest, CompanyEditResponse } from '../model/types/companyEditPageTypes';

const editCompanyApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		editCompany: build.mutation<CompanyEditResponse, CompanyEditBodyRequest>({
			query: (company) => ({
				url: route(editCompanyApiUrls.editCompany, company.id),
				method: 'PATCH',
				body: company,
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					const result = await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(route(ROUTES.admin.companies.details.page, result.data.id));
					toast.success(i18n.t(Translation.TOAST_COMPANY_EDIT_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_COMPANY_EDIT_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.COMPANIES, ApiTags.COMPANY_DETAIL],
		}),
		deleteCompany: build.mutation<void, string>({
			query: (companyId) => ({
				url: route(editCompanyApiUrls.deleteCompany, companyId),
				method: 'DELETE',
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(ROUTES.admin.companies.page);
					toast.success(i18n.t(Translation.TOAST_COMPANIES_DELETE_SINGLE_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_COMPANIES_DELETE_SINGLE_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.COMPANIES],
		}),
	}),
});

export const { useEditCompanyMutation, useDeleteCompanyMutation } = editCompanyApi;
