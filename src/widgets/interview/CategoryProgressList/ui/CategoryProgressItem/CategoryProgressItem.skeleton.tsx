import { BarChartSkeleton } from '@/shared/ui/charts/BarChart';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

export const CategoryProgressItemSkeleton = () => {
	return (
		<Flex direction="column" gap="4">
			<Flex justify="between" align="center">
				<TextSkeleton variant="body2" width={70} />
				<TextSkeleton variant="body2" width={40} />
			</Flex>
			<BarChartSkeleton />
		</Flex>
	);
};
