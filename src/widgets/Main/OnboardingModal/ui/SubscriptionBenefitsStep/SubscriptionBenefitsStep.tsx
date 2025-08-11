import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Onboarding } from '@/shared/config/i18n/i18nTranslations';
import { SELECT_TARIFF_SETTINGS_TAB } from '@/shared/constants/customRoutes';

import { AdvantagesBlock } from '../AdvantagesBlock/AdvantagesBlock';
import { LayoutStepComponent } from '../LayoutStepComponent/LayoutStepComponent';

export const SubscriptionBenefitsStep = (goNextStep?: () => void) => {
	const { t } = useTranslation(i18Namespace.onboarding);
	const navigate = useNavigate();

	const improvements = [
		t(Onboarding.SUBSCRIPTION_IMPROVEMENTS_LIST_FIRST),
		t(Onboarding.SUBSCRIPTION_IMPROVEMENTS_LIST_SECOND),
		t(Onboarding.SUBSCRIPTION_IMPROVEMENTS_LIST_THIRD),
	];
	const benefits = [
		t(Onboarding.SUBSCRIPTION_BENEFITS_LIST_FIRST),
		t(Onboarding.SUBSCRIPTION_BENEFITS_LIST_SECOND),
		t(Onboarding.SUBSCRIPTION_BENEFITS_LIST_THIRD),
		t(Onboarding.SUBSCRIPTION_BENEFITS_LIST_FOURTH),
	];

	const onMoveSelectSubscription = () => {
		navigate(SELECT_TARIFF_SETTINGS_TAB);
	};
	return (
		<LayoutStepComponent
			title={t(Onboarding.SUBSCRIPTION_TITLE)}
			buttonLeftText={t(Onboarding.SUBSCRIPTION_LEFT_BUTTON)}
			buttonLeftClick={onMoveSelectSubscription}
			buttonRightText={t(Onboarding.SUBSCRIPTION_RIGHT_BUTTON)}
			buttonRightClick={() => goNextStep?.()}
		>
			<AdvantagesBlock label={t(Onboarding.SUBSCRIPTION_IMPROVEMENTS_LABEL)} items={improvements} />
			<AdvantagesBlock
				withIcon
				label={t(Onboarding.SUBSCRIPTION_BENEFITS_LABEL)}
				items={benefits}
			/>
		</LayoutStepComponent>
	);
};
