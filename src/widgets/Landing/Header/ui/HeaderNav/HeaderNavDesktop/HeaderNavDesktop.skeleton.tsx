import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

export const HeaderNavDesktopSkeleton = () => {
	return (
		<Flex gap="26">
			<Skeleton width={120} height={20} borderRadius={4} />
			<Skeleton width={90} height={20} borderRadius={4} />
			<Skeleton width={130} height={20} borderRadius={4} />
		</Flex>
	);
};
