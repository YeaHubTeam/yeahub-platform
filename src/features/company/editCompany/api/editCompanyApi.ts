import { i18n, Translation, ApiTags, baseApi, ROUTES, ExtraArgument } from '@/shared/config';
import { route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { getEditCompanyApiErrorMessages } from '../lib/utils/getEditCompanyApiErrorMessages';
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
					const { data } = await queryFulfilled;
					const typedExtra = extra as ExtraArgument;

					typedExtra.navigate(route(ROUTES.admin.companies.details.page, data.id));
					toast.success(i18n.t(Translation.TOAST_COMPANIES_EDIT_SUCCESS));
				} catch (error) {
					getEditCompanyApiErrorMessages(error).forEach((message) => toast.error(i18n.t(message)));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.COMPANIES, ApiTags.COMPANY_DETAIL],
		}),
	}),
});

export const { useEditCompanyMutation } = editCompanyApi;
