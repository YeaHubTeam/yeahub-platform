import { useTranslation } from 'react-i18next';

import { i18Namespace, Resume } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './ResumeAnalyzerKeywordsCardHeader.module.css';

interface ResumeAnalyzerKeywordsCardHeaderProps {
	totalMatched: number;
	totalKeywords: number;
}

export const ResumeAnalyzerKeywordsCardHeader = ({
	totalMatched,
	totalKeywords,
}: ResumeAnalyzerKeywordsCardHeaderProps) => {
	const { t } = useTranslation(i18Namespace.resume);

	return (
		<Flex className={styles.header}>
			<Text variant="body6">{t(Resume.ANALYSIS_KEYWORDS_TITLE)}</Text>
			<div className={styles.counter}>
				<Text variant="body2-accent" color="purple-800">
					{t(Resume.ANALYSIS_KEYWORDS_MATCHED_TOTAL, {
						matched: totalMatched,
						total: totalKeywords,
					})}
				</Text>
			</div>
		</Flex>
	);
};
