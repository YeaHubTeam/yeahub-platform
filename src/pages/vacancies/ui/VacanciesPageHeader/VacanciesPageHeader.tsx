import { useTranslation } from 'react-i18next';

import { Vacancies, i18Namespace } from '@/shared/config';
import { Text } from '@/shared/ui/Text';

export const VacanciesPageHeader = () => {
	const { t } = useTranslation(i18Namespace.vacancies);

	return <Text variant="head2">{t(Vacancies.LIST_PAGE_TITLE).toLocaleUpperCase()}</Text>;
};
