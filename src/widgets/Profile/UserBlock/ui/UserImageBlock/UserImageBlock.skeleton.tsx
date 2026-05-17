import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

export const UserImageBlockSkeleton = () => {
	return (
		<Flex gap="8" direction="column">
			<Skeleton width={170} height={188} borderRadius={20} />
			<Flex direction="column" gap="4">
				<Skeleton width={170} height={18} />
				<Skeleton width={170} height={18} />
			</Flex>
		</Flex>
	);
};
