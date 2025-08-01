import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuizResult } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import styles from './AboutBenefits.module.css';

export const AboutBenefits = () => {
	const { t } = useTranslation(i18Namespace.interviewQuizResult);

	const benefits = [
		t(InterviewQuizResult.MODAL_FEATURES_FULL_ACCESS),
		t(InterviewQuizResult.MODAL_FEATURES_SMART_MODE),
		t(InterviewQuizResult.MODAL_FEATURES_STATS),
		t(InterviewQuizResult.MODAL_FEATURES_INTERVIEWS),
	];

	return (
		<Flex direction="column">
			<Text variant="body3-accent" color="black-600">
				{t(InterviewQuizResult.MODAL_QUESTION)}
			</Text>
			<Text variant="body3-accent" color="black-600">
				{t(InterviewQuizResult.MODAL_ACCESS)}
			</Text>
			<Text variant="body3-accent" color="black-600" className={styles['list-title']}>
				{t(InterviewQuizResult.MODAL_METRICS)}
			</Text>
			<ul className={styles.ul}>
				{benefits.map((benefit) => {
					return (
						<Flex key={benefit} componentType="li" align="center" gap="8" className={styles.li}>
							<Icon icon="check" color="purple-700" size={20} />
							{benefit}
						</Flex>
					);
				})}
			</ul>
		</Flex>
	);
};
