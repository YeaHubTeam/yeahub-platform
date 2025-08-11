import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Onboarding } from '@/shared/config/i18n/i18nTranslations';
import { Text } from '@/shared/ui/Text';

import { AdvantagesBlock } from '../AdvantagesBlock/AdvantagesBlock';
import { LayoutStepComponent } from '../LayoutStepComponent/LayoutStepComponent';

export const ServiceOverviewStep = (goNextStep?: () => void) => {
	const { t } = useTranslation(i18Namespace.onboarding);
	const services = [
		t(Onboarding.OVERVIEW_SERVICE_LIST_FIRST),
		t(Onboarding.OVERVIEW_SERVICE_LIST_SECOND),
		t(Onboarding.OVERVIEW_SERVICE_LIST_THIRD),
	];
	return (
		<LayoutStepComponent
			title={t(Onboarding.OVERVIEW_SERVICE_TITLE)}
			buttonLeftClick={() => goNextStep?.()}
			buttonLeftText={t(Onboarding.OVERVIEW_SERVICE_BUTTON)}
		>
			<AdvantagesBlock items={services} />
			<Text variant={'body3-accent'}>{t(Onboarding.OVERVIEW_SERVICE_DESCRIPTION)}</Text>
		</LayoutStepComponent>
	);
};
