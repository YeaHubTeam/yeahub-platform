import { DefaultBodyType, http, HttpResponse } from 'msw';

import { subscriptionApiUrls } from '../../model/constants/subscriptionConstants';
import { GetSubscriptionsResponse } from '../../model/types/subscription';

import { subscriptionsMock as subscriptionsDataMock } from './data';

export const subscriptionsMock = http.get<never, DefaultBodyType, GetSubscriptionsResponse>(
	`${process.env.API_URL}${subscriptionApiUrls.getSubscriptions}`,
	() => {
		if (!subscriptionsDataMock || subscriptionsDataMock.length === 0) {
			return new HttpResponse(null, { status: 404 });
		}

		return HttpResponse.json(subscriptionsDataMock);
	},
);
