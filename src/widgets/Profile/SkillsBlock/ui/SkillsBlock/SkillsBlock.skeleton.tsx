import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { SkeletonBlock } from '@/shared/ui/SkeletonBlock';

export const SkillsBlockSkeleton = () => {
	return (
		<SkeletonBlock>
			<Flex gap="8" style={{ flexWrap: 'wrap' }}>
				{[...Array(8)].map((_, index) => (
					<span key={index}>
						<Skeleton width={index % 2 === 0 ? 110 : 140} height={42} />
					</span>
				))}
			</Flex>
		</SkeletonBlock>
	);
};
