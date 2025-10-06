import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { LS_ACCESS_TOKEN_KEY } from '@/shared/constants/authConstants';
import { getFromLS } from '@/shared/helpers/manageLocalStorage';
import { toast } from '@/shared/ui/Toast';

export const approveResourceRequestApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		approveResourceRequest: build.mutation<void, string>({
			query: (resourceId) => ({
				url: `/external-products/request/${resourceId}/approve`,
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getFromLS(LS_ACCESS_TOKEN_KEY)}`,
				},
			}),

			async onQueryStarted(_, { queryFulfilled }) {
				try {
					await queryFulfilled;
					toast.success(i18n.t(Translation.TOAST_RESOURCE_APPROVE_SUCCESS));
				} catch {
					toast.error(i18n.t(Translation.TOAST_RESOURCE_APPROVE_FAILED));
				}
			},

			invalidatesTags: [ApiTags.RESOURCE_REQUESTS],
		}),
	}),
});

export const { useApproveResourceRequestMutation } = approveResourceRequestApi;
