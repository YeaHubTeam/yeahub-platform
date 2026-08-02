import { DefaultBodyType, http, HttpResponse } from 'msw';

import { subscribeApiUrls } from '../../model/constants/subscribeButtonConstants';

import { paymentsIdDataMock } from './data';

export const paymentsIdMock = http.get<{ subscriptionId: string }, DefaultBodyType, string>(
	`${process.env.API_URL}${subscribeApiUrls.getPaymentUrl}`,
	({ params }) => {
		const { subscriptionId } = params;

		if (!subscriptionId) {
			return new HttpResponse(null, { status: 400 });
		}

		return HttpResponse.text(paymentsIdDataMock);
	},
);
