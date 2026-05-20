import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

export const TelegramLoginSkeleton = () => {
	return (
		<Flex direction="column" gap="8" align="center">
			<Skeleton width={300} height={18} borderRadius={4} />
			<Skeleton width={238} height={40} borderRadius={4} />
		</Flex>
	);
};
