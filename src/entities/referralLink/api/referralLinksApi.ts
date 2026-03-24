import { ApiTags, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { referralLinksApiUrls } from '../model/constants/referralLinksConstants';
import {
	GetReferralLinkByIdParamsRequest,
	GetReferralLinkByIdResponse,
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
		getReferralLinkById: build.query<GetReferralLinkByIdResponse, GetReferralLinkByIdParamsRequest>(
			{
				query: ({ id }) => ({
					url: route(referralLinksApiUrls.getReferralLinkById, id),
				}),
				providesTags: [ApiTags.REFERRALS],
			},
		),
	}),
});

export const { useGetReferralLinksListQuery, useGetReferralLinkByIdQuery } = referralLinkApi;
