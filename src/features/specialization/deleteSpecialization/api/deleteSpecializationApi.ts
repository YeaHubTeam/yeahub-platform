import { ROUTES, i18n, Translation, ApiTags, baseApi, ExtraArgument } from '@/shared/config';
import { route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { deleteSpecializationApiUrls } from '../model/constants/deleteSpecializationConstants';

const deleteSpecializationApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		deleteSpecialization: build.mutation<void, number>({
			query: (specializationId) => ({
				url: route(deleteSpecializationApiUrls.deleteSpecialization, specializationId),
				method: 'DELETE',
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					toast.success(i18n.t(Translation.TOAST_SPECIALIZATIONS_DELETE_SINGLE_SUCCESS));
					typedExtra.navigate(ROUTES.admin.specializations.page);
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_SPECIALIZATIONS_DELETE_SINGLE_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.SPECIALIZATIONS, ApiTags.SPECIALIZATION_DETAIL],
		}),
	}),
});

export const { useDeleteSpecializationMutation } = deleteSpecializationApi;
