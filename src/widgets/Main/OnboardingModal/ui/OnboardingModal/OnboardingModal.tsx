import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Onboarding } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
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

export type Steps = 1 | 2 | 3 | 4 | 5;

const getSteps = (t: (arg: string) => string): Step<Steps>[] => [
	{
		id: 1,
		label: t(Onboarding.STEPPER_FIRST_STEP),
		image: 'handShake',
		Component: GreetingStep,
	},
	{
		id: 2,
		label: t(Onboarding.STEPPER_SECOND_STEP),
		image: 'specialization',
		Component: ChooseSpecializationStep,
	},
	{
		id: 3,
		label: t(Onboarding.STEPPER_THIRD_STEP),
		image: 'student',
		Component: ServiceOverviewStep,
	},
	{
		id: 4,
		label: t(Onboarding.STEPPER_FOURTH_STEP),
		image: 'graphUp',
		Component: SubscriptionBenefitsStep,
	},
	{
		id: 5,
		label: t(Onboarding.STEPPER_FIFTH_STEP),
		image: 'keySquare',
		Component: FinalStep,
	},
];

export const OnboardingModal = ({ isOpen, onClose }: RequiredModalProps) => {
	const { t } = useTranslation(i18Namespace.onboarding);
	const steps = getSteps(t);

	const { isMobileM } = useScreenSize();

	const [activeStep, setActiveStep] = useState<Step<Steps>>(steps[0]);
	const activeStepIndex = steps.findIndex((step) => step.id === activeStep.id);

	const goNextStep = () => {
		setActiveStep(steps[activeStepIndex + 1]);
	};

	const onCloseModal = () => {
		if (activeStepIndex === steps.length - 1) {
			onClose();
		}
	};

	const StepComponent = () => activeStep.Component(goNextStep);

	return (
		<Modal isOpen={isOpen} onClose={onCloseModal} className={styles['onboarding-modal']}>
			<Flex direction={isMobileM ? 'column' : 'row'}>
				<Flex direction={'column'} className={styles['stepper-container']}>
					<OnboardingHeader activeStep={activeStep.id} />
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
