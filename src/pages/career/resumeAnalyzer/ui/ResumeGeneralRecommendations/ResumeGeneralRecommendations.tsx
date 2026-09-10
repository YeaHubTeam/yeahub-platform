import { useTranslation } from 'react-i18next';

import { resumeRecommendations } from '@/shared/assets';
import StarFall from '@/shared/assets/icons/starFall.svg';
import { i18Namespace, Resume } from '@/shared/config';
import { getJSONFromLS, LS_RESUME_ANALYSIS_KEY } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './ResumeGeneralRecommendations.module.css';

interface ResumeGeneralRecommendationsProps {
	recommendations: string[];
}

export const getStoredResumeRecommendations = (): string[] | null => {
	const storedAnalysis = getJSONFromLS(LS_RESUME_ANALYSIS_KEY);
	const recommendations = storedAnalysis?.response?.profile?.recommendations;

	return Array.isArray(recommendations) ? recommendations : null;
};

export const ResumeGeneralRecommendations = ({
	recommendations,
}: ResumeGeneralRecommendationsProps) => {
	const { t } = useTranslation(i18Namespace.resume);

	if (recommendations.length === 0) {
		return null;
	}

	return (
		<Card withBorder className={styles.card}>
			<Flex
				componentType="section"
				align="center"
				gap="24"
				aria-label={t(Resume.GENERAL_RECOMMENDATIONS_TITLE)}
				className={styles.content}
			>
				<Flex direction="column" gap="12" className={styles.details}>
					<Flex direction="column" gap="8">
						<Flex align="center" gap="12">
							<StarFall width={24} height={24} className={styles.icon} aria-hidden />
							<Text variant="head4" className={styles.title}>
								{t(Resume.GENERAL_RECOMMENDATIONS_TITLE)}
							</Text>
						</Flex>
						<Text variant="body3-accent" color="black-500">
							{t(Resume.GENERAL_RECOMMENDATIONS_DESCRIPTION)}
						</Text>
					</Flex>
					<Flex componentType="ul" direction="column" gap="8">
						{recommendations.map((recommendation, index) => (
							<li key={`${recommendation}-${index}`} className={styles.item}>
								<Text variant="body3-accent">{recommendation}</Text>
							</li>
						))}
					</Flex>
				</Flex>
				<img
					src={resumeRecommendations}
					width={355}
					height={237}
					alt=""
					aria-hidden
					className={styles.illustration}
				/>
			</Flex>
		</Card>
	);
};
