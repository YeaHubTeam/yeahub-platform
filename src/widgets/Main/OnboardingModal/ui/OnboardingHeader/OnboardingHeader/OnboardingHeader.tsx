import { useTranslation } from 'react-i18next';

import { i18Namespace, Onboarding } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { OnboardingProgress } from '../OnboadringProgress/OnboardingProgress';

interface OnboardingHeaderProps {
	activeStep: number;
	finalStep: number;
}

export const OnboardingHeader = ({ activeStep, finalStep }: OnboardingHeaderProps) => {
	const { t } = useTranslation(i18Namespace.onboarding);
	const { isSmallScreen, isMobileM } = useScreenSize();
	return (
		<Flex gap={isSmallScreen ? '4' : '8'} align={'start'}>
			<Flex direction={'column'} gap={'8'}>
				<Text variant={'head3'} color={isMobileM ? 'black-900' : 'white-900'}>
					{t(Onboarding.TITLE)}
				</Text>
				<Text
					variant={isSmallScreen ? 'body2' : 'body3'}
					color={isMobileM ? 'black-600' : 'black-100'}
				>
					{t(Onboarding.DESCRIPTION)}
				</Text>
			</Flex>
			<OnboardingProgress activeStep={activeStep} finalStep={finalStep} />
		</Flex>
	);
};
