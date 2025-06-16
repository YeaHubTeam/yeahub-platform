import { baseApi } from '@/shared/config/api/baseApi';
import { route } from '@/shared/helpers/route';

import { unsubscribeApiUrls } from '../model/constants/unsubscribeConstants';
import { SubscriptionInfoResponse } from '../model/types/types';

const getSubscriptionInfo = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getSubscriptionInfo: build.query<SubscriptionInfoResponse[], string>({
			query: (userId) => ({
				url: route(unsubscribeApiUrls.getSubscriptionInfoId, userId),
				method: 'GET',
			}),
		}),
	}),
});

export const { useGetSubscriptionInfoQuery } = getSubscriptionInfo;
