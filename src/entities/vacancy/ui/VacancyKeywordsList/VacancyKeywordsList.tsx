import classNames from 'classnames';

import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './VacancyKeywordsList.module.css';

export type VacancyKeywordsListColor = 'purple';

export interface VacancyKeywordsListProps {
	keywords: string[];
	topCount: number;
	color?: VacancyKeywordsListColor;
}

export const VacancyKeywordsList = ({
	keywords,
	topCount,
	color = 'purple',
}: VacancyKeywordsListProps) => {
	return (
		<Flex align="end" gap="12" wrap="wrap" className={styles[color]}>
			{keywords.map((keyword, index) => {
				const isAccent = index + 1 <= topCount;

				return (
					<div
						key={`${keyword}-${index}`}
						className={classNames(styles.keyword, {
							[styles.accent]: isAccent,
						})}
					>
						<Text variant="body2" className={styles.title}>
							{keyword}
						</Text>
					</div>
				);
			})}
		</Flex>
	);
};
