import { baseApi } from '@/shared/config/api/baseApi';
import { route } from '@/shared/helpers/route';

import { subscriptionPrices } from '@/entities/subscription';

import { subscribeApiUrls } from '../model/constants/subscribeButtonConstants';
import { GetPaymentUrlParamsRequest } from '../model/types/subscriptionAgreeTypes';

const getPaymentUrl = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getPaymentUrl: build.query<string, GetPaymentUrlParamsRequest>({
			query: (params) => ({
				url: route(subscribeApiUrls.getPaymentUrl, params.subscriptionId || ''),
				params: { cost: subscriptionPrices.discountPrice, email: params.email },
				responseHandler: 'text',
			}),
		}),
	}),
});
export const { useLazyGetPaymentUrlQuery } = getPaymentUrl;
