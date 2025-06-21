import { baseApi } from '@/shared/config/api/baseApi';
import { route } from '@/shared/helpers/route';

import { subscribeApiUrls } from '../model/constants/subscribeButtonConstants';

const getPaymentUrl = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getPaymentUrl: build.query<string, string>({
			query: (subscribeId) => ({
				url: route(subscribeApiUrls.getPaymentUrl, subscribeId || ''),
				responseHandler: 'text',
			}),
		}),
	}),
});
export const { useLazyGetPaymentUrlQuery } = getPaymentUrl;
