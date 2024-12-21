import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { UpIcon } from '@/shared/ui/Icons/TechnologyIcon';
import { TechnologyIcon } from '@/shared/ui/Icons/UpIcon';

import styles from './OfferList.module.css';

export const OfferList = () => {
	const { t } = useTranslation(i18Namespace.landing);

	return (
		<ul className={styles['offer-list']}>
			<li>
				<UpIcon />
				<p>{t(Landing.TRAINING_ADVANTAGES_FIRST)}</p>
			</li>
			<li>
				<TechnologyIcon />
				<p> {t(Landing.TRAINING_ADVANTAGES_SECOND)}</p>
			</li>
		</ul>
	);
};
