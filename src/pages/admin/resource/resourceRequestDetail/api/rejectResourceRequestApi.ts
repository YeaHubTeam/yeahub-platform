import { ApiTags, baseApi, i18n, Translation } from '@/shared/config';
import { route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { ResourceRequest } from '@/entities/resource';

import { rejectResourceRequestApiUrls } from '../lib/constants/rejectResourceRequestConstants';

const rejectResourceRequestApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		rejectResourceRequest: builder.mutation<void, ResourceRequest['id']>({
			query: (resourceId) => ({
				url: route(rejectResourceRequestApiUrls.rejectResourceRequest, resourceId),
				method: 'PUT',
			}),
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					await queryFulfilled;
					toast.success(i18n.t(Translation.TOAST_RESOURCE_REQUEST_REJECT_SUCCESS));
				} catch {
					toast.error(i18n.t(Translation.TOAST_RESOURCE_REQUEST_REJECT_FAILED));
				}
			},
			invalidatesTags: [ApiTags.RESOURCE_REQUESTS, ApiTags.RESOURCE_REQUEST],
		}),
	}),
});

export const { useRejectResourceRequestMutation } = rejectResourceRequestApi;
