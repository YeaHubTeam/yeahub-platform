import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

export const RangeSkeleton = () => {
	return (
		<Flex direction="column" gap="8" style={{ width: '100%' }}>
			<Flex justify="between" align="center" style={{ width: '100%' }}>
				<TextSkeleton variant="body3" width={24} />
				<TextSkeleton variant="body3" width={24} />
				<TextSkeleton variant="body3" width={24} />
				<TextSkeleton variant="body3" width={24} />
				<TextSkeleton variant="body3" width={24} />
			</Flex>

			<Flex align="center" gap="4" style={{ width: '100%' }}>
				<Skeleton width="100%" height={4} borderRadius={2} />
				<Skeleton width={24} height={20} style={{ flexShrink: 0 }} />
				<Skeleton width="100%" height={4} borderRadius={2} />
			</Flex>
		</Flex>
	);
};
