import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { route } from '@/shared/helpers/route';

import { paymentsApiUrls } from '../model/constants/payments';
import { PaginationParams, Payment } from '../model/types/payments';

export const paymentApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getPaymentsHistory: build.query<Payment, { id: string; params?: PaginationParams }>({
			query: ({ id, params }) => ({
				url: route(paymentsApiUrls.getPaymentsHistory, id || ''),
				params,
			}),
			providesTags: [ApiTags.PAYMENTS],
		}),
	}),
});

export const { useGetPaymentsHistoryQuery } = paymentApi;
