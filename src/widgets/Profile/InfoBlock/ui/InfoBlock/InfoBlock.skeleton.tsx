import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { SkeletonBlock } from '@/shared/ui/SkeletonBlock';

export const InfoBlockSkeleton = () => {
	return (
		<SkeletonBlock>
			<Flex direction="column" gap="8" style={{ width: '100%' }}>
				{[...Array(6)].map((_, index) => (
					<Skeleton width="100%" height={14} key={index} />
				))}
			</Flex>
		</SkeletonBlock>
	);
};
