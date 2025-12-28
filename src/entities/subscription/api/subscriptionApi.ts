import { isAfter, isEqual, parseISO } from 'date-fns';

import { ApiTags, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { GetSubscriptionsResponse } from '@/entities/subscription/model/types/subscription';

import type { GetUserSubscriptionResponse } from '../';
import { subscriptionApiUrls } from '../model/constants/subscriptionConstants';
import { setActiveSubscription } from '../model/slices/activeSubscriptionSlice';

export const subscriptionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getUserSubscription: build.query<GetUserSubscriptionResponse, string>({
			query: (userId) => ({
				url: route(subscriptionApiUrls.getUserSubscription, userId),
			}),
			providesTags: [ApiTags.SUBSCRIPTIONS_USER],
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
		getSubscriptions: build.query<GetSubscriptionsResponse, void>({
			query: () => ({
				url: route(subscriptionApiUrls.getSubscriptions),
			}),
			transformResponse(subscriptions: GetSubscriptionsResponse) {
				return subscriptions.filter((subscription) => subscription.isActive);
			},
			providesTags: [ApiTags.SUBSCRIPTIONS],
		}),
	}),
});

export const { useGetUserSubscriptionQuery, useGetSubscriptionsQuery } = subscriptionApi;
