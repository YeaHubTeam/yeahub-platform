import { Flex } from '@/shared/ui/Flex';
import { StepIndicatorIcon } from '@/shared/ui/Icons/StepIndicatorIcon/StepIndicatorIcon';
import { Text } from '@/shared/ui/Text';

import styles from './OnboardingProgress.module.css';

const FINAL_STEP = 5;

export interface OnboardingProgressProps {
	activeStep: number;
}

export const OnboardingProgress = ({ activeStep }: OnboardingProgressProps) => {
	return (
		<Flex className={styles['progress']} justify="center" align="center">
			<StepIndicatorIcon activeStep={activeStep} />
			<Text variant="body3-strong">
				{activeStep}/{FINAL_STEP}
			</Text>
		</Flex>
	);
};
