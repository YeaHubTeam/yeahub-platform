import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import { LegendListSkeleton } from '../LegendList/LegendList.skeleton';

export const PieChartSkeleton = ({ attemptStatsLength }: { attemptStatsLength: number }) => {
	return (
		<Flex justify="between" align="center" gap="48">
			<Skeleton
				width="clamp(192px, calc(192px + 9.98vw - 57.6px), 307px)"
				height="clamp(192px, calc(192px + 9.98vw - 57.6px), 307px)"
				borderRadius="50%"
			/>
			<LegendListSkeleton attemptStatsLength={attemptStatsLength} />
		</Flex>
	);
};
