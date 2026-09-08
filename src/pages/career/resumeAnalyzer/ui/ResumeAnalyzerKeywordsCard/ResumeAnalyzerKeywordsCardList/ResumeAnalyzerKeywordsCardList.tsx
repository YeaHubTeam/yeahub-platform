import classNames from 'classnames';

import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { Tooltip } from '@/shared/ui/Tooltip';

import { formatKeywordTitle } from '../../../model/helpers/formatKeywordTitle';
import type { Keyword } from '../../../model/types/resumeAnalyzer';

import styles from './ResumeAnalyzerKeywordsCardList.module.css';

export type KeywordListVariant = 'matched' | 'missing' | 'optional' | 'critical';

interface ResumeAnalyzerKeywordsCardListProps {
	title: string;
	keywords: Keyword[];
	limit: number;
	variant: KeywordListVariant;
	isExpanded: boolean;
	showCount?: boolean;
}

export const ResumeAnalyzerKeywordsCardList = ({
	title,
	keywords,
	limit,
	variant,
	isExpanded,
	showCount = true,
}: ResumeAnalyzerKeywordsCardListProps) => {
	const visibleKeywords = isExpanded ? keywords : keywords.slice(0, limit);
	const hiddenKeywords = keywords.slice(limit);
	const shouldShowRemainder = !isExpanded && hiddenKeywords.length > 0;
	const hiddenKeywordTitles = hiddenKeywords
		.map(({ title: keywordTitle }) => formatKeywordTitle(keywordTitle))
		.join(', ');

	return (
		<Flex
			componentType="section"
			direction="column"
			gap="12"
			className={styles.group}
			dataTestId={`ResumeAnalyzerKeywordsCardList-${variant}`}
		>
			<Text variant="body3-accent">
				{title}
				{showCount ? ` (${keywords.length})` : ''}
			</Text>
			<Flex gap="12" wrap="wrap" align="center">
				{visibleKeywords.map((keyword, index) => (
					<div
						key={`${keyword.title}-${index}`}
						className={classNames(styles.chip, styles[variant])}
						data-testid={`ResumeAnalyzerKeywordsCardList-Item-${variant}`}
					>
						<Text variant="body3" className={styles['chip-text']}>
							{formatKeywordTitle(keyword.title)}
						</Text>
					</div>
				))}
				{shouldShowRemainder && (
					<Tooltip title={hiddenKeywordTitles} placement="top" className={styles.tooltip}>
						<Text
							variant="body3"
							color="black-500"
							className={styles.remainder}
							dataTestId={`ResumeAnalyzerKeywordsCardList-Remainder-${variant}`}
						>
							+{hiddenKeywords.length}
						</Text>
					</Tooltip>
				)}
			</Flex>
		</Flex>
	);
};
