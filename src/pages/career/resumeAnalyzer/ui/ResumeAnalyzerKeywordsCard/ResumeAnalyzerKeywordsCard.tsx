import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Resume } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { ShowToggleButton } from '@/shared/ui/ShowToggleButton';

import type { Keyword, Keywords } from '../../model/types/resumeAnalyzer';

import styles from './ResumeAnalyzerKeywordsCard.module.css';
import { ResumeAnalyzerKeywordsCardHeader } from './ResumeAnalyzerKeywordsCardHeader/ResumeAnalyzerKeywordsCardHeader';
import {
	KeywordListVariant,
	ResumeAnalyzerKeywordsCardList,
} from './ResumeAnalyzerKeywordsCardList/ResumeAnalyzerKeywordsCardList';

interface ResumeAnalyzerKeywordsCardProps {
	keywords: Keywords;
}

interface KeywordGroupConfig {
	title: string;
	keywords: Keyword[];
	limit: number;
	variant: KeywordListVariant;
	showCount?: boolean;
}

export const ResumeAnalyzerKeywordsCard = ({ keywords }: ResumeAnalyzerKeywordsCardProps) => {
	const { t } = useTranslation(i18Namespace.resume);
	const [isExpanded, setIsExpanded] = useState(false);

	const keywordGroups: KeywordGroupConfig[] = [
		{
			title: t(Resume.ANALYSIS_KEYWORDS_MATCHED),
			keywords: keywords.matchedKeywords,
			limit: 8,
			variant: 'matched',
		},
		{
			title: t(Resume.ANALYSIS_KEYWORDS_MISSING),
			keywords: keywords.missingKeywords,
			limit: 8,
			variant: 'missing',
		},
		{
			title: t(Resume.ANALYSIS_KEYWORDS_OPTIONAL),
			keywords: keywords.optionalKeywords,
			limit: 5,
			variant: 'optional',
		},
		{
			title: t(Resume.ANALYSIS_KEYWORDS_CRITICAL),
			keywords: keywords.criticalKeywords,
			limit: 5,
			variant: 'critical',
			showCount: false,
		},
	];

	const shouldShowToggle = keywordGroups.some(
		({ keywords: groupKeywords, limit }) => groupKeywords.length > limit,
	);

	return (
		<Card
			className={styles.card}
			classNameContent={styles.body}
			size="small"
			withOutsideShadow
			dataTestId="ResumeAnalyzerKeywordsCard"
		>
			<div className={styles.content}>
				<ResumeAnalyzerKeywordsCardHeader
					totalMatched={keywords.totalMatched}
					totalKeywords={keywords.totalVacancyKeywords}
				/>
				<div className={styles.groups}>
					{keywordGroups.map((group) => (
						<ResumeAnalyzerKeywordsCardList
							key={group.variant}
							{...group}
							isExpanded={isExpanded}
						/>
					))}
				</div>
			</div>
			{shouldShowToggle && (
				<div className={styles.toggle}>
					<ShowToggleButton
						isExpanded={isExpanded}
						onToggle={() => setIsExpanded((value) => !value)}
					/>
				</div>
			)}
		</Card>
	);
};
