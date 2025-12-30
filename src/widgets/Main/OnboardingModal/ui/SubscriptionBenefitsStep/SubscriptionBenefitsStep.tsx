import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Onboarding } from '@/shared/config';
import { SELECT_TARIFF_SETTINGS_TAB } from '@/shared/libs';

import { AdvantagesBlock } from '../AdvantagesBlock/AdvantagesBlock';
import { LayoutStepComponent } from '../LayoutStepComponent/LayoutStepComponent';

interface SubscriptionBenefitsStepProps {
	goNextStep?: () => void;
}

export const SubscriptionBenefitsStep = ({ goNextStep }: SubscriptionBenefitsStepProps) => {
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
			buttonPrimaryText={t(Onboarding.SUBSCRIPTION_LEFT_BUTTON)}
			buttonPrimaryClick={onMoveSelectSubscription}
			buttonSecondaryText={t(Onboarding.SUBSCRIPTION_RIGHT_BUTTON)}
			buttonSecondaryClick={() => goNextStep?.()}
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
