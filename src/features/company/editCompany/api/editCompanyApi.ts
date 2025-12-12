import { i18n, Translation, ApiTags, baseApi, ROUTES, ExtraArgument } from '@/shared/config';
import { route } from '@/shared/libs';
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
	}),
});

export const { useEditCompanyMutation } = editCompanyApi;
