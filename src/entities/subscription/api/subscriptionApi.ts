import { isAfter, isEqual, parseISO } from 'date-fns';

import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { route } from '@/shared/helpers/route';

import type { GetUserSubscriptionResponse } from '../';
import { subscriptionApiUrls } from '../model/constants/subscriptionConstants';
import { setActiveSubscription } from '../model/slices/activeSubscriptionSlice';

export const subscriptionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getUserSubscription: build.query<GetUserSubscriptionResponse, string>({
			query: (userId) => ({
				url: route(subscriptionApiUrls.getUserSubscription, userId),
			}),
			providesTags: [ApiTags.SUBSCRIPTIONS],
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					const now = new Date();
					const activeSubscription = data.find(
						(item) =>
							['active', 'canceled'].includes(item.state) &&
							(isAfter(parseISO(item.endDate), now) || isEqual(parseISO(item.endDate), now)),
					);
					if (activeSubscription) {
						dispatch(setActiveSubscription({ subscription: activeSubscription }));
					}
				} catch (error) {
					// eslint-disable-next-line no-console
					console.error('Failed to process user subscription:', error);
				}
			},
		}),
	}),
});

export const { useGetUserSubscriptionQuery } = subscriptionApi;
