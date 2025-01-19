import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { ExtraArgument } from '@/shared/config/store/types';
import { route } from '@/shared/helpers/route';
import { toast } from '@/shared/ui/Toast';

import { editSpecializationApiUrls } from '../model/constants/editSpecializationConstants';
import {
	EditSpecializationBodyRequest,
	EditSpecializationResponse,
} from '../model/types/specializationEditPageTypes';

const editSpecializationApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		editSpecialization: build.mutation<EditSpecializationResponse, EditSpecializationBodyRequest>({
			query: (specialization) => ({
				url: route(editSpecializationApiUrls.editSpecialization, specialization.id),
				method: 'PATCH',
				body: specialization,
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					const result = await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(route(ROUTES.admin.specializations.details.page, result.data.id));
					toast.success(i18n.t(Translation.TOAST_SPECIALIZATION_EDIT_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_SPECIALIZATION_EDIT_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.SPECIALIZATIONS, ApiTags.SPECIALIZATION_DETAIL],
		}),
	}),
});

export const { useEditSpecializationMutation } = editSpecializationApi;
