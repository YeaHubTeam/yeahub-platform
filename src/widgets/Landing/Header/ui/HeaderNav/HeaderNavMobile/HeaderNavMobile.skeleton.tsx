import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

export const HeaderNavMobileSkeleton = () => {
	return (
		<Flex gap="10">
			<Skeleton width={93} height={20} borderRadius={4} />
			<Skeleton width={20} height={20} borderRadius={4} />
		</Flex>
	);
};
