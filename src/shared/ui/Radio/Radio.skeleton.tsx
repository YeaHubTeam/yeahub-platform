import { Flex } from '../Flex';
import { Skeleton } from '../Skeleton';
import { TextSkeleton } from '../Text';

export const RadioSkeleton = () => {
	return (
		<Flex align="center" gap="10">
			<Skeleton width={20} height={20} borderRadius="50%" />
			<TextSkeleton variant="body3" width={120} />
		</Flex>
	);
};
