import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

export const HeaderNavMobileSkeleton = () => {
	return (
		<Flex dataTestId="HeaderNavMobileSkeleton_Wrapper" gap="10">
			<Skeleton dataTestId="HeaderNavMobileSkeleton" width={93} height={20} borderRadius={4} />
			<Skeleton dataTestId="HeaderNavMobileSkeleton" width={20} height={20} borderRadius={4} />
		</Flex>
	);
};
