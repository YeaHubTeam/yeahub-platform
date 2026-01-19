import { i18n, Translation, ApiTags, baseApi, ROUTES, ExtraArgument } from '@/shared/config';
import { handleApiError, route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { getCreateCompanyApiErrorMessage } from '../lib/utils/getCreateCompanyApiErrorMessage';
import { createCompanyApiUrls } from '../model/constants/createCompanyConstants';
import { CreateCompanyBodyRequest, CreateCompanyResponse } from '../model/types/companyCreateTypes';

export const createCompanyApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createCompany: build.mutation<CreateCompanyResponse, CreateCompanyBodyRequest>({
			query: (company) => ({
				url: createCompanyApiUrls.createCompany,
				method: 'POST',
				body: company,
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					const result = await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(route(ROUTES.admin.companies.details.page, result.data.id));
					toast.success(i18n.t(Translation.TOAST_COMPANIES_CREATE_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(handleApiError(error, getCreateCompanyApiErrorMessage)));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.COMPANIES],
		}),
	}),
});

export const { useCreateCompanyMutation } = createCompanyApi;
