import { differenceInDays, getDaysInMonth } from 'date-fns';

export const calculateSubscriptionDays = (endDate: Date | '', createDate: Date | '') => {
	if (!endDate || !createDate) {
		return {
			restDays: 0,
			daysInMonth: 0,
		};
	}

	const restDays = Math.max(0, differenceInDays(endDate, new Date()));
	const daysInMonth = getDaysInMonth(createDate);

	return {
		restDays,
		daysInMonth,
	};
};
