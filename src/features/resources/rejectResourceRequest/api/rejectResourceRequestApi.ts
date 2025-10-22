import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { route } from '@/shared/helpers/route';
import { toast } from '@/shared/ui/Toast';

import { ResourceRequest } from '@/entities/resource';

import { rejectResourceRequestApiUrls } from '@/features/resources/rejectResourceRequest/model/constants/rejectResourceRequestConstants';

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
