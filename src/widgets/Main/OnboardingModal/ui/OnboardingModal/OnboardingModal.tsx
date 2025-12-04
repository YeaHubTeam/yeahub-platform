import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Onboarding } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Modal, RequiredModalProps } from '@/shared/ui/Modal';
import { Step, Stepper } from '@/shared/ui/Stepper';

import { ChooseSpecializationStep } from '../ChooseSpecializationStep/ChooseSpecializationStep';
import { FinalStep } from '../FinalStep/FinalStep/FinalStep';
import { GreetingStep } from '../GreetingStep/GreetingStep';
import { OnboardingHeader } from '../OnboardingHeader/OnboardingHeader/OnboardingHeader';
import { ServiceOverviewStep } from '../ServiceOverviewStep/ServiceOverviewStep';
import { SubscriptionBenefitsStep } from '../SubscriptionBenefitsStep/SubscriptionBenefitsStep';

import styles from './OnboardingModal.module.css';

export type OnboardingStep =
	| 'greeting'
	| 'choose-specialization'
	| 'service-overview'
	| 'subscription'
	| 'final';

const getSteps = (t: (arg: string) => string): Step<OnboardingStep>[] => [
	{
		id: 'greeting',
		label: t(Onboarding.STEPPER_GREETING_STEP),
		image: 'handShake',
		Component: GreetingStep,
	},
	{
		id: 'choose-specialization',
		label: t(Onboarding.STEPPER_CHOOSE_SPECIALIZATION_STEP),
		image: 'specialization',
		Component: ChooseSpecializationStep,
	},
	{
		id: 'service-overview',
		label: t(Onboarding.STEPPER_SERVICE_OVERVIEW_STEP),
		image: 'student',
		Component: ServiceOverviewStep,
	},
	{
		id: 'subscription',
		label: t(Onboarding.STEPPER_SUBSCRIPTION_STEP),
		image: 'graphUp',
		Component: SubscriptionBenefitsStep,
	},
	{
		id: 'final',
		label: t(Onboarding.STEPPER_FINAL_STEP),
		image: 'keySquare',
		Component: FinalStep,
	},
];

export const OnboardingModal = ({ isOpen, onClose }: RequiredModalProps) => {
	const { t } = useTranslation(i18Namespace.onboarding);
	const steps = getSteps(t);

	const { isMobileM } = useScreenSize();

	const [activeStep, setActiveStep] = useState<Step<OnboardingStep>>(steps[0]);
	const activeStepIndex = steps.findIndex((step) => step.id === activeStep.id);
	const allowClose = activeStepIndex === steps.length - 1;

	const goNextStep = () => {
		setActiveStep(steps[activeStepIndex + 1]);
	};

	const onCloseModal = () => {
		if (allowClose) {
			onClose();
		}
	};

	const StepComponent = () => activeStep.Component({ goNextStep });

	return (
		<Modal
			isOpen={isOpen}
			onClose={onCloseModal}
			withCloseIcon={allowClose}
			className={styles['onboarding-modal']}
		>
			<Flex direction={isMobileM ? 'column' : 'row'}>
				<Flex direction={'column'} className={styles['stepper-container']}>
					<OnboardingHeader activeStep={activeStepIndex + 1} finalStep={steps.length} />
					<Stepper
						steps={steps}
						activeStep={activeStep}
						setActiveStep={setActiveStep}
						isMobile={isMobileM}
					/>
				</Flex>
				<Flex align={'center'} className={styles['active-step-content']}>
					<StepComponent />
				</Flex>
			</Flex>
		</Modal>
	);
};
