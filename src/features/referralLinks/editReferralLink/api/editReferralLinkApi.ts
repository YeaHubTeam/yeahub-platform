import { i18n, Translation, ApiTags, baseApi, ROUTES, ExtraArgument } from '@/shared/config';
import { route, handleApiError } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { editReferralLinkApiUrls } from '../model/constants/editReferralLinkApiUrls';
import { EditReferralLinkBodyRequest, EditReferralLinkResponse } from '../model/types/referralEditPageTypes';

import { getEditReferralLinkApiErrorMessage } from '../lib/utils/getEditReferralLinkApiErrorMessage';

export const editReferralLinkApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    editReferralLink: build.mutation<EditReferralLinkResponse, EditReferralLinkBodyRequest>({
      query: (referralLink) => ({
        url: route(editReferralLinkApiUrls.editReferralLink, referralLink.id),
        method: 'PUT',
        body: referralLink
      }),
      async onQueryStarted(_, { queryFulfilled, extra }) {
        try {
          const result = await queryFulfilled;
          const typedExtra = extra as ExtraArgument;
          typedExtra.navigate(route(ROUTES.admin.referralLinks.details.page, result.data.id));
          toast.success(i18n.t(Translation.TOAST_REFERRALLINK_EDIT_SUCCESS));
        } catch (error) {
          toast.error(i18n.t(handleApiError(error, getEditReferralLinkApiErrorMessage)));
          // eslint-disable-next-line no-console
          console.error(error);
        }
      },
      invalidatesTags: [ApiTags.REFERRALS, ApiTags.REFERRAL_DETAIL],
    })
  })
})

export const { useEditReferralLinkMutation } = editReferralLinkApi