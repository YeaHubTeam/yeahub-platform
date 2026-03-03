import { ApiTags, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { referralApiUrls } from '../model/constants/referralConstants';
import {
	GetReferralByIdParamsRequest,
	GetReferralByIdResponse,
	GetReferralsListParamsRequest,
	GetReferralsListResponse,
} from '../model/types/referrals';

const referralApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getReferralsList: build.query<GetReferralsListResponse, GetReferralsListParamsRequest>({
			query: (params) => ({
				url: referralApiUrls.getReferralsList,
				params,
			}),
			providesTags: [ApiTags.REFERRALS],
		}),
		getReferralById: build.query<GetReferralByIdResponse, GetReferralByIdParamsRequest>({
			query: ({ referralId }) => ({
				url: route(referralApiUrls.getReferralById, referralId),
			}),
			providesTags: [ApiTags.REFERRAL_DETAIL],
		}),
	}),
});

export const { useGetReferralsListQuery, useGetReferralByIdQuery } = referralApi;
