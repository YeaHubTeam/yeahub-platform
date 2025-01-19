import { CardSkeleton } from '@/shared/ui/Card';
import { PieChartSkeleton } from '@/shared/ui/charts';
import { Flex } from '@/shared/ui/Flex';

import { AttemptInfoItemSkeleton } from '../AttemptInfoItem/AttemptInfoItem.skeleton';

import { PercentsInfoPieProps } from './PercentsInfoPie';
import styles from './PercentsInfoPie.module.css';

export const PercentsInfoPieSkeleton = ({
	className,
	attemptStatsLength,
}: Partial<PercentsInfoPieProps> & { attemptStatsLength: number }) => {
	return (
		<CardSkeleton className={className} isTitleCenter title="title">
			<Flex justify="center" align="center" gap="48" className={styles.wrapper}>
				<PieChartSkeleton />
				<Flex componentType="ul" direction="column" gap="24" className={styles.list}>
					{[...Array(attemptStatsLength)].map((_, i) => (
						<AttemptInfoItemSkeleton key={i} />
					))}
				</Flex>
			</Flex>
		</CardSkeleton>
	);
};
