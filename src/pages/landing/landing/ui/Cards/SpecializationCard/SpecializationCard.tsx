import { useTranslation } from 'react-i18next';

import { i18Namespace, Landing } from '@/shared/config';

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
