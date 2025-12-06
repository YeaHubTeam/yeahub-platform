import { ROUTES, i18n, Translation, ApiTags, baseApi, ExtraArgument } from '@/shared/config';
import { route } from '@/shared/libs';
import { handleApiError } from '@/shared/libs/query/handleApiError/handleApiError';
import { toast } from '@/shared/ui/Toast';

import { createSpecializationApiUrls } from '../model/constants/createSpecializationConstants';
import { getSpecializationsErrorMessage } from '../model/lib/utils/getApiErrorMessage';
import {
	CreateSpecializationBodyRequest,
	CreateSpecializationResponse,
} from '../model/types/specializationCreateTypes';

export const createSpecializationApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createSpecialization: build.mutation<
			CreateSpecializationResponse,
			CreateSpecializationBodyRequest
		>({
			query: (specialization) => ({
				url: route(createSpecializationApiUrls.createSpecialization),
				method: 'POST',
				body: specialization,
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					const result = await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(route(ROUTES.admin.specializations.details.page, result.data.id));
					toast.success(i18n.t(Translation.TOAST_SPECIALIZATION_CREATE_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(handleApiError(error, getSpecializationsErrorMessage)));
					//eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.SPECIALIZATIONS],
		}),
	}),
});

export const { useCreateSpecializationMutation } = createSpecializationApi;
