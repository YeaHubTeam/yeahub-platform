import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { subscriptionApiUrls } from '../model/constants/subscriptionConstants';
import type { GetUserSubscriptionRespons } from '../model/types/subscription';
import { route } from '@/shared/helpers/route';

export const subscriptionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getUserSubscription: build.query<GetUserSubscriptionRespons, string>({
			query: (userId) => ({
				url: route(subscriptionApiUrls.getUserSubstriction, userId),
			}),
			providesTags: [ApiTags.SUBSTRICTIONS],
		}),
	}),
});

export const { useGetUserSubscriptionQuery } = subscriptionApi;
