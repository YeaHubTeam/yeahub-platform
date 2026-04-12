import { i18n, Translation, ApiTags, baseApi } from '@/shared/config';
import { handleApiError } from '@/shared/libs';
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
				url: `${deleteReferralLinkApiUrls.deleteReferralLink}/${id}`,
				method: 'DELETE',
			}),
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					await queryFulfilled;
					toast.success(i18n.t(Translation.TOAST_REFERRALLINK_DELETE_SUCCESS));
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
