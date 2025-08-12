import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Onboarding } from '@/shared/config/i18n/i18nTranslations';

import { LayoutStepComponent } from '../../LayoutStepComponent/LayoutStepComponent';
import { NavigationBlock } from '../NavigationBlock/NavigationBlock';

import styles from './FinalStep.module.css';

export const FinalStep = () => {
	const { t } = useTranslation(i18Namespace.onboarding);

	return (
		<LayoutStepComponent
			title={t(Onboarding.FINAL_TITLE)}
			description={t(Onboarding.FINAL_CONTENT)}
			className={styles['final']}
		>
			<NavigationBlock />
		</LayoutStepComponent>
	);
};
