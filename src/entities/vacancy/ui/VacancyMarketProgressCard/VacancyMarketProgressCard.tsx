import { Flex } from '@/shared/ui/Flex';
import { ProgressBar } from '@/shared/ui/ProgressBar';
import { Text } from '@/shared/ui/Text';

import styles from './VacancyMarketProgressCard.module.css';

interface VacancyMarketProgressCardProps {
	title: string;
	displayedPercent: number;
	count: number;
}

export const VacancyMarketProgressCard = ({
	title,
	displayedPercent,
	count,
}: VacancyMarketProgressCardProps) => {
	return (
		<Flex direction="row" align="center" className={styles.container} gap="14">
			<Flex direction="column" gap="4" className={styles['progress-container']}>
				<Flex justify="between" align="center" gap="12">
					<Text variant="body3-accent">{title}</Text>

					<Text variant="body3-accent">{displayedPercent}%</Text>
				</Flex>
				<ProgressBar
					className={styles.progress}
					currentCount={displayedPercent}
					totalCount={100}
					variant="medium"
				/>
			</Flex>
			<Text color="black-300" variant="body3-accent">
				{count}
			</Text>
		</Flex>
	);
};
