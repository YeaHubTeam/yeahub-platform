import { parseISO } from 'date-fns';

import { GetUserSubscriptionResponse } from '@/entities/subscription';

export const getActiveSubscriptions = (subscriptions: GetUserSubscriptionResponse | undefined) => {
	if (!subscriptions) return undefined;
	if (subscriptions.length === 0) return undefined;
	return subscriptions.find(
		(item) =>
			(item.state.toLowerCase() === 'active' || item.state.toLowerCase() === 'canceled') &&
			parseISO(item.endDate) >= new Date(),
	);
};
