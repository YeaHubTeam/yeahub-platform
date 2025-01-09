import { format } from 'date-fns';

export const formatDate = (date: Date, formatStr: string = 'dd/MM/yyyy') => {
	if (isNaN(date.getTime())) return '—';
	return format(date, formatStr);
};
