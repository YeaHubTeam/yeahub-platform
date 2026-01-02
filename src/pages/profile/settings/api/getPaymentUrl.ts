import { baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { subscribeApiUrls } from '../lib/constants/subscribeButtonConstants';
import { GetPaymentUrlParamsRequest } from '../model/types/subscriptionAgreeTypes';

const getPaymentUrl = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getPaymentUrl: build.query<string, GetPaymentUrlParamsRequest>({
			query: (params) => ({
				url: route(subscribeApiUrls.getPaymentUrl, params.subscriptionId || ''),
				params: { email: params.email },
				responseHandler: 'text',
			}),
		}),
	}),
});
export const { useLazyGetPaymentUrlQuery } = getPaymentUrl;
