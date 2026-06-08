import { i18n, Translation, baseApi, ROUTES, ExtraArgument, ApiTags } from '@/shared/config';
import { handleApiError, route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { getDeleteFeatureFlagApiErrorMessage } from '../lib/utils/getDeleteFlagApiMessage';
import { deleteFeatureFlagApiUrls } from '../model/constants/deleteFeatureFlagConstants';

const deleteFeatureFlagApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		deleteFeatureFlag: build.mutation<void, string>({
			query: (featureFlagId) => ({
				url: route(deleteFeatureFlagApiUrls.deleteFeatureFlag, featureFlagId),
				method: 'DELETE',
			}),

			async onQueryStarted(_, { queryFulfilled, extra }) {
				const typedExtra = extra as ExtraArgument;

				try {
					await queryFulfilled;
					toast.success(i18n.t(Translation.TOAST_FEATURE_FLAG_DELETE_SINGLE_SUCCESS));
					typedExtra.navigate(ROUTES.admin.featureFlags.page);
				} catch (error) {
					toast.error(i18n.t(handleApiError(error, getDeleteFeatureFlagApiErrorMessage)));
				}
			},

			invalidatesTags: [ApiTags.FEATURE_FLAGS],
		}),
	}),
});

export const { useDeleteFeatureFlagMutation } = deleteFeatureFlagApi;
