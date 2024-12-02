import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { ExtraArgument } from '@/shared/config/store/types';
import { route } from '@/shared/helpers/route';
import { toast } from '@/shared/ui/Toast';

import { createSpecializationApiUrls } from '../model/constants/createSpecializationConstants';
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
					toast.error(i18n.t(Translation.TOAST_SPECIALIZATION_CREATE_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.SPECIALIZATIONS],
		}),
	}),
});

export const { useCreateSpecializationMutation } = createSpecializationApi;
