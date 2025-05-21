import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';

import { CardLayout } from './../CardLayout/CardLayout';
import { SpecializationBlock } from './SpecializationBlock/SpecializationBlock';

export const SpecializationCard = () => {
	const { t } = useTranslation(i18Namespace.landing);

	return (
		<CardLayout
			contentSlot={<SpecializationBlock />}
			title={t(Landing.SPECIALIZATION_NEW_TITLE)}
			description={t(Landing.SPECIALIZATION_DESCRIPTION)}
		/>
	);
};
