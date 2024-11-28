import { Trans } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Auth } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import { BenefitItem } from '../BenefitItem/BenefitItem';

import { benefitsItems } from './benefitsItems';
import styles from './BenefitsList.module.css';

export const BenefitsList = () => {
	const { t } = useI18nHelpers(i18Namespace.auth);

	return (
		<div className={styles['benefit-list-wrapper']}>
			<h4 className={styles.title}>
				<Trans i18nKey={Auth.BENEFITS_TITLE} ns="auth" />
			</h4>
			<ul className={styles['benefit-wrapper']}>
				{benefitsItems.map((benefit) => (
					<BenefitItem key={benefit} text={t(benefit)} />
				))}
			</ul>
		</div>
	);
};
