import { differenceInSeconds, format, parseISO } from 'date-fns';

export const formatTime = (date: Date) => format(date, 'HH:mm');

export const getTimeDifference = (startDate: string, endDate: string) => {
	if (!startDate || !endDate) return '—';

	const formattedStartDate = parseISO(startDate);
	const formattedEndDate = parseISO(endDate);

	if (isNaN(formattedStartDate.getTime()) || isNaN(formattedEndDate.getTime())) {
		return '—';
	}

	const seconds = differenceInSeconds(formattedEndDate, formattedStartDate);

	const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
	const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
	const secs = String(seconds % 60).padStart(2, '0');
	return `${hours}:${minutes}:${secs}`;
};
