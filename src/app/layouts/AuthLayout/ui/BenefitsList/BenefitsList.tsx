import { Trans } from 'react-i18next';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Auth } from '@/shared/config/i18n/i18nTranslations';

import { BenefitItem } from '../BenefitItem/BenefitItem';

import styles from './BenefitsList.module.css';

export const BenefitsList = () => {
	const { t } = useTranslation(i18Namespace.auth);

	const benefitsItems: string[] = [
		Auth.BENEFITS_STEP_PLAN,
		Auth.BENEFITS_CAREER_GROWTH,
		Auth.BENEFITS_BIG_COMMUNITY,
		Auth.BENEFITS_MENTOR_TRAINING,
		Auth.BENEFITS_INTERNSHIP_OPPORTUNITIES,
	];

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
