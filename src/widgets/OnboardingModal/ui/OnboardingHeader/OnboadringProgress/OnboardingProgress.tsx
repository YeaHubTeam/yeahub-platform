import { Flex } from '@/shared/ui/Flex';
import { StepIndicatorIcon } from '@/shared/ui/Icons';
import { Text } from '@/shared/ui/Text';

import styles from './OnboardingProgress.module.css';

export interface OnboardingProgressProps {
	activeStep: number;
	finalStep: number;
}

export const OnboardingProgress = ({ activeStep, finalStep }: OnboardingProgressProps) => {
	return (
		<Flex className={styles['progress']} justify="center" align="center">
			<StepIndicatorIcon activeStep={activeStep} />
			<Text variant="body3-strong">
				{activeStep}/{finalStep}
			</Text>
		</Flex>
	);
};
