import { ROUTES, i18n, Translation, ApiTags, baseApi, ExtraArgument } from '@/shared/config';
import { route, handleApiError } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { createFeatureFlagApiUrls } from '../model/constants/createFeatureFlagConstants';
import {
	CreateFeatureFlagBodyRequest,
	CreateFeatureFlagResponse,
} from '../model/types/featureFlagCreateTypes';
import { getCreateFeatureFlagErrorMessage } from '../model/utils/getApiErrorMessage';

export const createFeatureFlagApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createFeatureFlag: build.mutation<CreateFeatureFlagResponse, CreateFeatureFlagBodyRequest>({
			query: (body) => ({
				url: route(createFeatureFlagApiUrls.createFeatureFlag),
				method: 'POST',
				body,
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(ROUTES.admin.featureFlags.page);
					toast.success(i18n.t(Translation.TOAST_FEATURE_FLAG_CREATE_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(handleApiError(error, getCreateFeatureFlagErrorMessage)));
				}
			},
			invalidatesTags: [ApiTags.FEATURE_FLAGS],
		}),
	}),
});

export const { useCreateFeatureFlagMutation } = createFeatureFlagApi;
