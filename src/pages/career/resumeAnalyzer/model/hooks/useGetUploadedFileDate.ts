import { format } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

export const useGetUploadedFileDate = (uploadedAt: string | null) => {
	const { i18n } = useTranslation();
	const dateLocale = i18n.language === 'ru' ? ru : enUS;
	const formattedDate = uploadedAt
		? format(new Date(uploadedAt), 'd MMMM yyyy', { locale: dateLocale })
		: null;
	return formattedDate;
};
