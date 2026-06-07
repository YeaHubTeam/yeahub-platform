import { DefaultBodyType, http, HttpResponse } from 'msw';

import { subscriptionApiUrls } from '../../model/constants/subscriptionConstants';
import { GetUserSubscriptionResponse } from '../../model/types/subscription';

import { subscriptionByUserIdMockResponse } from './data/subscriptionUserMock';

export const subscriptionByUserIdMock = http.get<
	never,
	DefaultBodyType,
	GetUserSubscriptionResponse
>(`${process.env.API_URL}${subscriptionApiUrls.getUserSubscription}`, () => {
	if (!subscriptionByUserIdMockResponse || subscriptionByUserIdMockResponse.length === 0) {
		return new HttpResponse(null, { status: 404 });
	}

	return HttpResponse.json(subscriptionByUserIdMockResponse);
});
