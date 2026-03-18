import { i18n, Translation, ApiTags, baseApi, ROUTES, ExtraArgument } from '@/shared/config';
import { handleApiError, route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { getCreateReferralLinkApiErrorMessage } from '../lib/utils/getCreateReferralLinkApiErrorMessage';
import { createReferralLinkApiUrls } from '../model/constants/createReferralLinkApiUrls';
import {
	CreateRefferalLinkBodyRequest,
	CreateRefferalLinkResponse,
} from '../model/types/refferalLinkCreateTypes';

export const createReferralLinkApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createReferralLink: build.mutation<CreateRefferalLinkResponse, CreateRefferalLinkBodyRequest>({
			query: (referralLink) => ({
				url: createReferralLinkApiUrls.createReferralLink,
				method: 'POST',
				body: referralLink,
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					const result = await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(route(ROUTES.admin.referralLinks.details.page, result.data.id));
					toast.success(i18n.t(Translation.TOAST_REFERRALLINK_CREATE_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(handleApiError(error, getCreateReferralLinkApiErrorMessage)));
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.REFERRALS],
		}),
	}),
});

export const { useCreateReferralLinkMutation } = createReferralLinkApi;
