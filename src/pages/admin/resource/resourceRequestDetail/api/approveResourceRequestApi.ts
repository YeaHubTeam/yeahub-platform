import { i18n, Translation, ApiTags, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { approveResourceApiUrls } from '../lib/constants/approveResourceConstants';

export const approveResourceRequestApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		approveResourceRequest: build.mutation<void, string>({
			query: (resourceId) => ({
				url: route(approveResourceApiUrls.approveResourceRequest, resourceId),
				method: 'PUT',
			}),

			async onQueryStarted(_, { queryFulfilled }) {
				try {
					await queryFulfilled;
					toast.success(i18n.t(Translation.TOAST_RESOURCE_APPROVE_SUCCESS));
				} catch {
					toast.error(i18n.t(Translation.TOAST_RESOURCE_APPROVE_FAILED));
					return;
				}
			},

			invalidatesTags: [ApiTags.RESOURCE_REQUESTS, ApiTags.RESOURCE_REQUEST],
		}),
	}),
});

export const { useApproveResourceRequestMutation } = approveResourceRequestApi;
