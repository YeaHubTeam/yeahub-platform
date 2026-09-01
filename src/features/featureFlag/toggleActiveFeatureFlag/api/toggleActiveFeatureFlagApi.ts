import { i18n, Translation, baseApi, ApiTags } from '@/shared/config';
import { handleApiError, route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { FeatureFlagApiItem } from '@/entities/featureFlag';

import { getToggleActiveFeatureFlagApiErrorMessage } from '../lib/utils/getToggleActiveFlagApiMessage';
import { toggleActiveFeatureFlagApiUrls } from '../model/constants/toggleActiveFeatureFlagConstants';
import { ToggleActiveFeatureFlagError } from '../model/types/toggleActiveFeatureFlagTypes';

type ToggleActiveFeatureFlagBodyRequest = Pick<FeatureFlagApiItem, 'id' | 'enabled'>;
type ToggleActiveFeatureResponse = FeatureFlagApiItem;

const updateFeatureFlagApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		toggleActiveFeatureFlag: build.mutation<
			ToggleActiveFeatureResponse,
			ToggleActiveFeatureFlagBodyRequest
		>({
			query: ({ id, enabled }) => ({
				url: route(toggleActiveFeatureFlagApiUrls.toggleActiveFeatureFlag, id),
				method: 'PATCH',
				body: {
					enabled,
				},
			}),

			async onQueryStarted({ enabled }, { queryFulfilled }) {
				try {
					await queryFulfilled;
					if (!enabled) {
						toast.success(i18n.t(Translation.TOAST_FEATURE_FLAG_UPDATE_SINGLE_DISABLED_SUCCESS));
					} else {
						toast.success(i18n.t(Translation.TOAST_FEATURE_FLAG_UPDATE_SINGLE_ENABLED_SUCCESS));
					}
				} catch (error) {
					toast.error(
						i18n.t(
							handleApiError(error, (apiError: ApiErrorData<ToggleActiveFeatureFlagError>) =>
								getToggleActiveFeatureFlagApiErrorMessage(apiError, enabled),
							),
						),
					);
				}
			},

			invalidatesTags: [ApiTags.FEATURE_FLAGS],
		}),
	}),
});

export const { useToggleActiveFeatureFlagMutation } = updateFeatureFlagApi;
