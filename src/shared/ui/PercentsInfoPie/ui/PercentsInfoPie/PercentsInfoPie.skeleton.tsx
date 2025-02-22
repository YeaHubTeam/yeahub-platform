import { CardSkeleton } from '@/shared/ui/Card';
import { PieChartSkeleton } from '@/shared/ui/charts';
import { Flex } from '@/shared/ui/Flex';

import { PercentsInfoPieProps } from './PercentsInfoPie';
import styles from './PercentsInfoPie.module.css';

export const PercentsInfoPieSkeleton = ({
	className,
	attemptStatsLength,
}: Partial<PercentsInfoPieProps> & { attemptStatsLength: number }) => {
	return (
		<CardSkeleton className={className} isTitleCenter title="title">
			<Flex justify="center" align="center" gap="48" className={styles.wrapper}>
				<PieChartSkeleton attemptStatsLength={attemptStatsLength} />
			</Flex>
		</CardSkeleton>
	);
};
