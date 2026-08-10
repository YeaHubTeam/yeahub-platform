import { format, isToday, isYesterday } from 'date-fns';
import { useTranslation } from 'react-i18next';

import { Translation, i18Namespace } from '@/shared/config';

export const useGetCurrentDay = (dateStr: string): string => {
	const { t } = useTranslation(i18Namespace.translation);

	const date = new Date(dateStr);

	if (isToday(date)) return t(Translation.DATE_TODAY);
	if (isYesterday(date)) return t(Translation.DATE_YESTERDAY);

	return format(date, 'dd.MM.yyyy');
};
