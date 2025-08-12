import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Onboarding } from '@/shared/config/i18n/i18nTranslations';

import { LayoutStepComponent } from './../LayoutStepComponent/LayoutStepComponent';
import styles from './GreetingStep.module.css';

interface GreetingStepProps {
	goNextStep?: () => void;
}

export const GreetingStep = ({ goNextStep }: GreetingStepProps) => {
	const { t } = useTranslation(i18Namespace.onboarding);
	return (
		<LayoutStepComponent
			headTitle={t(Onboarding.GREETING_TITLE)}
			description={t(Onboarding.GREETING_CONTENT)}
			buttonPrimaryClick={() => goNextStep?.()}
			buttonPrimaryText={t(Onboarding.GREETING_BUTTON)}
			className={styles['greeting']}
		/>
	);
};
