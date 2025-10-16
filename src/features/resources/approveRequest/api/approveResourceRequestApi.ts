import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { route } from '@/shared/helpers/route';
import { toast } from '@/shared/ui/Toast';

import { approveResourceApiUrls } from '../model/constants/approveResourceConstants';

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
