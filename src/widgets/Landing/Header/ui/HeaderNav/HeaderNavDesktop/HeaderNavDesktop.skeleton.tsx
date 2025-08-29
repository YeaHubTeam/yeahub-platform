import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

export const HeaderNavDesktopSkeleton = () => {
	return (
		<Flex dataTestId={'HeaderNavDesktopSkeleton_Wrapper'} gap="26">
			<Skeleton dataTestId={'HeaderNavDesktopSkeleton'} width={120} height={20} borderRadius={4} />
			<Skeleton dataTestId={'HeaderNavDesktopSkeleton'} width={90} height={20} borderRadius={4} />
		</Flex>
	);
};
