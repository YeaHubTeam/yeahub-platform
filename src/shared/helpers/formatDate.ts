import { format } from 'date-fns';

export const formatDate = (date: Date, formatStr: string = 'MM.dd.yyyy') => format(date, formatStr);
