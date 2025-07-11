import { baseApi } from '@/shared/config/api/baseApi';
import { route } from '@/shared/helpers/route';

import { subscriptionPrices } from '@/entities/subscription';

import { subscribeApiUrls } from '../model/constants/subscribeButtonConstants';

const getPaymentUrl = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getPaymentUrl: build.query<string, string>({
			query: (subscribeId) => ({
				url: route(subscribeApiUrls.getPaymentUrl, subscribeId || ''),
				params: { cost: subscriptionPrices.discountPrice },
				responseHandler: 'text',
			}),
		}),
	}),
});
export const { useLazyGetPaymentUrlQuery } = getPaymentUrl;
