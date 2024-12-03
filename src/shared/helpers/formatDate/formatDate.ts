import { format } from 'date-fns';

export const formatDate = (date: Date, formatStr: string = 'MM.dd.yyyy') => {
	if (isNaN(date.getTime())) return '—';
	return format(date, formatStr);
};
