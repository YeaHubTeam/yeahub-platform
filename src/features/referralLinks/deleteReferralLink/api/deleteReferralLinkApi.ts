import { i18n, Translation, ApiTags, baseApi, ExtraArgument, ROUTES } from '@/shared/config';
import { handleApiError, route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { getDeleteReferralLinkApiErrorMessage } from '../lib/utils/getDeleteReferralLinkApiErrorMessage';
import { deleteReferralLinkApiUrls } from '../model/constants/deleteReferralLinkApiUrls';
import {
	DeleteReferralLinkRequest,
	DeleteReferralLinkResponse,
} from '../model/types/deleteReferralLinkTypes';

export const deleteReferralLinkApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		deleteReferralLink: build.mutation<DeleteReferralLinkResponse, DeleteReferralLinkRequest>({
			query: (id) => ({
				url: route(deleteReferralLinkApiUrls.deleteReferralLink, id),
				method: 'DELETE',
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					toast.success(i18n.t(Translation.TOAST_REFERRALLINK_DELETE_SUCCESS));
					typedExtra.navigate(ROUTES.admin.referralLinks.page);
				} catch (error) {
					toast.error(i18n.t(handleApiError(error, getDeleteReferralLinkApiErrorMessage)));
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.REFERRALS],
		}),
	}),
});

export const { useDeleteReferralLinkMutation } = deleteReferralLinkApi;
