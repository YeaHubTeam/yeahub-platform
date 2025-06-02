import { baseApi } from '@/shared/config/api/baseApi';
import { route } from '@/shared/helpers/route';

import { subscribeApiUrls } from '../model/constants/subscribeButtonConstants';

const getNewSubscriptionOrderId = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getOrderBySubscriptionId: build.query<string, string>({
			query: (subscribeId) => ({
				url: route(subscribeApiUrls.getOrderBySubscriptionId, subscribeId || ''),
			}),
		}),
	}),
});
export const { useLazyGetOrderBySubscriptionIdQuery } = getNewSubscriptionOrderId;
