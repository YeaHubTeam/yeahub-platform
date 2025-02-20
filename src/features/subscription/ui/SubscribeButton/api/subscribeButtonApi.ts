import { baseApi } from '@/shared/config/api/baseApi';

const subscribeButtonApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getOrderId: build.query<{ orderId: string }, { id: string }>({
			query: ({ id }) => `subscriptions/${id}/orders/new`,
		}),
	}),
});
export const { useLazyGetOrderIdQuery } = subscribeButtonApi;
