import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { route } from '@/shared/helpers/route';

import { paymentsApiUrls } from '../model/constants/payments';
import { PaginationParams, GetPaymentsResponse } from '../model/types/payments';

export const paymentApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getPaymentsHistory: build.query<GetPaymentsResponse, { id: string; params?: PaginationParams }>(
			{
				query: ({ id, params }) => ({
					url: route(paymentsApiUrls.getPaymentsHistory, id || ''),
					params: { page: 1, limit: 5, ...params },
				}),
				providesTags: [ApiTags.PAYMENTS],
			},
		),
	}),
});

export const { useGetPaymentsHistoryQuery } = paymentApi;
