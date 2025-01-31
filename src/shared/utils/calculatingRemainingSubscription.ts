import type { GetUserSubscriptionResponse } from '@/entities/subscription';

export const calculatingRemainingSubscription = (
	data: GetUserSubscriptionResponse,
): number | null => {
	const subscriptionCreateDate = data?.[0]?.createDate;

	if (subscriptionCreateDate) {
		const beenDays = new Date().getTime() - new Date(subscriptionCreateDate).getTime();
		const thirtyDaysInMilliseconds = 2592000000;
		const numberGettingSecondsInMilliseconds = 1000;
		const numberGettingHoursInMilliseconds = 3600;
		const numberGettingDayInMilliseconds = 24;

		const timeDifference =
			thirtyDaysInMilliseconds - beenDays === 0
				? thirtyDaysInMilliseconds
				: thirtyDaysInMilliseconds - beenDays;

		const remainingSubscription = Math.round(
			timeDifference /
				(numberGettingSecondsInMilliseconds *
					numberGettingHoursInMilliseconds *
					numberGettingDayInMilliseconds),
		);

		return remainingSubscription;
	}
	return null;
};
