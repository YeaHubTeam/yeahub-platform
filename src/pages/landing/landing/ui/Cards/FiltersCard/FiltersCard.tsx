import { useTranslation } from 'react-i18next';

import { i18Namespace, Landing } from '@/shared/config';

import { blocks } from '../../../model/constants';
import { CardLayout } from '../CardLayout/CardLayout';

export const FiltersCard = () => {
	const { t } = useTranslation(i18Namespace.landing);
	return (
		<CardLayout
			contentSlot={
				<img src={blocks.filters.src} alt={blocks.filters.alt} data-testid="FiltersCard_Img" />
			}
			title={t(Landing.FILTERS_TITLE)}
			description={t(Landing.FILTERS_DESCRIPTION)}
		/>
	);
};
