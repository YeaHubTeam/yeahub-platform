import { ApiTags, baseApi, ExtraArgument, i18n, ROUTES, Translation } from '@/shared/config';
import { handleApiError, route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { getEditFeatureFlagApiErrorMessage } from '../lib/utils/getEditFeatureFlagApiErrorMessage';
import { editFeatureFlagApiUrls } from '../model/constants/editFeatureFlagConstants';
import {
	EditFeatureFlagBodyRequest,
	EditFeatureFlagResponse,
} from '../model/types/featureFlagEditTypes';

export const editFeatureFlagApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		editFeatureFlag: build.mutation<EditFeatureFlagResponse, EditFeatureFlagBodyRequest>({
			query: (featureFlag) => ({
				url: route(editFeatureFlagApiUrls.editFeatureFlag, featureFlag.id),
				method: 'PATCH',
				body: featureFlag,
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					const result = await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					toast.success(i18n.t(Translation.TOAST_FEATURE_FLAGS_EDIT_SUCCESS));
					typedExtra.navigate(route(ROUTES.admin.featureFlags.details.page, result.data.id));
				} catch (error) {
					toast.error(i18n.t(handleApiError(error, getEditFeatureFlagApiErrorMessage)));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.FEATURE_FLAGS, ApiTags.FEATURE_FLAG_DETAIL],
		}),
	}),
});

export const { useEditFeatureFlagMutation } = editFeatureFlagApi;
