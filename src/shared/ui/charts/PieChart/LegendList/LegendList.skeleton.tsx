import { Flex } from '@/shared/ui/Flex';

import { LegendItemSkeleton } from '../LegendItem/LegendItem.skeleton';

export const LegendListSkeleton = ({ attemptStatsLength }: { attemptStatsLength: number }) => {
	return (
		<Flex componentType="ul" direction="column" justify="between" gap="24">
			{[...Array(attemptStatsLength)].map((_, index) => (
				<LegendItemSkeleton key={index} />
			))}
		</Flex>
	);
};
