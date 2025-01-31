import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { route } from '@/shared/helpers/route';

import type { GetUserSubscriptionResponse } from '../';
import { subscriptionApiUrls } from '../model/constants/subscriptionConstants';

export const subscriptionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getUserSubscription: build.query<GetUserSubscriptionResponse, string>({
			query: (userId) => ({
				url: route(subscriptionApiUrls.getUserSubscription, userId),
			}),
			providesTags: [ApiTags.SUBSCRIPTIONS],
		}),
	}),
});

export const { useGetUserSubscriptionQuery } = subscriptionApi;
