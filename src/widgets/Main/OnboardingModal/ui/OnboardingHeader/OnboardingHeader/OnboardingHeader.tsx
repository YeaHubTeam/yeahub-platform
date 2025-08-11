import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Onboarding } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { OnboardingProgress } from '../OnboadringProgress/OnboardingProgress';

import styles from './OnboardingHeader.module.css';

interface OnboardingHeaderProps {
	activeStep: number;
}

export const OnboardingHeader = ({ activeStep }: OnboardingHeaderProps) => {
	const { t } = useTranslation(i18Namespace.onboarding);
	return (
		<Flex gap={'8'} align={'start'} className={styles['header-container']}>
			<Flex direction={'column'} gap={'8'} className={styles['header']}>
				<Text variant={'head3'} color={'white-900'}>
					{t(Onboarding.TITLE)}
				</Text>
				<Text variant={'body3'} color={'black-100'}>
					{t(Onboarding.DESCRIPTION)}
				</Text>
			</Flex>
			<OnboardingProgress activeStep={activeStep} />
		</Flex>
	);
};
