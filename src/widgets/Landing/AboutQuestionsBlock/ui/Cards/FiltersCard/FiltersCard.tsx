import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';

import { blocks } from '../../../model/constants';
import { CardLayout } from '../CardLayout/CardLayout';

export const FiltersCard = () => {
	const { t } = useTranslation(i18Namespace.landing);
	return (
		<CardLayout
			contentSlot={<img src={blocks.filters.src} alt={blocks.filters.alt} />}
			title={t(Landing.FILTERS_TITLE)}
			description={t(Landing.FILTERS_DESCRIPTION)}
		/>
	);
};
