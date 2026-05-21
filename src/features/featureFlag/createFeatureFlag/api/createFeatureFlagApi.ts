import { ApiTags, baseApi, ExtraArgument, i18n, ROUTES, Translation } from '@/shared/config';
import { handleApiError, route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { getCreateFeatureFlagApiErrorMessage } from '../lib/utils/getCreateFeatureFlagApiErrorMessage';
import { createFeatureFlagApiUrls } from '../model/constants/createFeatureFlagConstants';
import {
	CreateFeatureFlagBodyRequest,
	CreateFeatureFlagResponse,
} from '../model/types/featureFlagCreateTypes';

export const createFeatureFlagApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createFeatureFlag: build.mutation<CreateFeatureFlagResponse, CreateFeatureFlagBodyRequest>({
			query: (featureFlag) => ({
				url: createFeatureFlagApiUrls.createFeatureFlag,
				method: 'POST',
				body: featureFlag,
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					const result = await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(route(ROUTES.admin.featureFlags.details.page, result.data.id));
					toast.success(i18n.t(Translation.TOAST_FEATURE_FLAGS_CREATE_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(handleApiError(error, getCreateFeatureFlagApiErrorMessage)));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.FEATURE_FLAGS],
		}),
	}),
});

export const { useCreateFeatureFlagMutation } = createFeatureFlagApi;
