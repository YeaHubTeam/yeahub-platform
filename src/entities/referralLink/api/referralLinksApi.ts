import { ApiTags, baseApi } from '@/shared/config';

import { referralLinksApiUrls } from '../model/constants/referralLinksConstants';
import {
	GetReferralLinksListParamsRequest,
	GetReferralLinksListResponse,
} from '../model/types/referralLinks';

const referralLinkApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getReferralLinksList: build.query<
			GetReferralLinksListResponse,
			GetReferralLinksListParamsRequest
		>({
			query: (params) => ({
				url: referralLinksApiUrls.getReferralLinksList,
				params,
			}),
			providesTags: [ApiTags.REFERRALS],
		}),
	}),
});

export const { useGetReferralLinksListQuery } = referralLinkApi;
