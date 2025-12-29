import { format } from 'date-fns';

export const formatTime = (date: Date) => format(date, 'HH:mm');
