import { format, Locale } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatDate = (date: Date, formatStr: string = 'MM.dd.yyyy', language: Locale = ru) =>
	format(date, formatStr, { locale: language });
