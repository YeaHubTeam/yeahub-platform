import { baseApi } from '@/shared/config/api/baseApi';
import { route } from '@/shared/helpers/route';

import { subscribeApiUrls } from '../model/constants/subscribeButtonConstants';

const getNewSubscriptionOrderId = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getOrderId: build.query<string, string>({
			query: (subscribeId) => ({
				url: route(subscribeApiUrls.getOrderBySubscriptionId, subscribeId || ''),
			}),
		}),
	}),
});
export const { useLazyGetOrderIdQuery } = getNewSubscriptionOrderId;
