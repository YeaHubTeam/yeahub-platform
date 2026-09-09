import { useTranslation } from 'react-i18next';

import { Vacancies, i18Namespace } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { ResumeProgressBar } from '../ResumeProgressBar/ResumeProgressBar';

import styles from './OverallVacancyCoverage.module.css';

interface OverallVacancyCoverageProps {
	percent: number;
}

export const OverallVacancyCoverage = ({ percent }: OverallVacancyCoverageProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);

	return (
		<Card withOutsideShadow className={styles.container}>
			<div className={styles.content}>
				<Flex direction="column" justify="between" gap="20" className={styles.progress}>
					<Flex direction="column" gap="10">
						<Text variant="body5">{t(Vacancies.RESUME_ANALYZER_COVERAGE_TITLE)}</Text>
						<Text variant="body3" color="black-500">
							{t(Vacancies.RESUME_ANALYZER_COVERAGE_DESCRIPTION)}
						</Text>
					</Flex>
					<ResumeProgressBar value={percent} />
				</Flex>
				<Flex direction="column" gap="10" justify="center" className={styles.info}>
					<Text variant="head2" color="purple-700">
						{percent}%
					</Text>
					<Text variant="body3-accent">
						{t(Vacancies.RESUME_ANALYZER_COVERAGE_RESULT, { percent })}
					</Text>
				</Flex>
			</div>
		</Card>
	);
};
