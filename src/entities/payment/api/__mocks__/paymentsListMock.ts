import { DefaultBodyType, http, HttpResponse } from 'msw';

import { paymentsApiUrls } from '../../model/constants/payments';
import { GetPaymentsResponse, PaginationParams } from '../../model/types/payments';

import { paymentsMock } from './data';

export const paymentsListMock = http.get<
	Record<keyof PaginationParams, string>,
	DefaultBodyType,
	GetPaymentsResponse
>(process.env.API_URL + paymentsApiUrls.getPaymentsHistory, ({ request }) => {
	const url = new URL(request.url);
	const page = url.searchParams.get('page') ?? 1;
	const limit = 5;

	const paginationDate = paymentsMock.data.slice(
		(Number(page) - 1) * Number(limit),
		Number(page) * Number(limit),
	);

	return HttpResponse.json({
		data: paginationDate,
		page: Number(page),
		total: paymentsMock.total,
		limit: paymentsMock.limit,
	});
});
