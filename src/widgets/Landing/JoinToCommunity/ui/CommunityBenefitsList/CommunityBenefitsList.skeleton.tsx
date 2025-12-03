import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

export const CommunityBenefitsListSkeleton = () => {
	const { isMobile } = useScreenSize();
	const itemWidth = isMobile ? '100%' : 'calc(50% - 8px)';

	return (
		<Flex gap="8" wrap="wrap">
			{Array(4)
				.fill(0)
				.map((_, i) => (
					<Flex key={i} gap="8" align="center" style={{ width: itemWidth }}>
						<Skeleton width={20} height={20} borderRadius="50%" />
						<Skeleton width={200} height={12} />
					</Flex>
				))}
		</Flex>
	);
};
