import { i18n, Translation, ApiTags, baseApi, ROUTES, ExtraArgument } from '@/shared/config';
import { route } from '@/shared/libs';
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
