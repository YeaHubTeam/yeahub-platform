import { useScreenSize } from '@/shared/libs';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { FaqItemSkeleton } from '../FaqItem/FaqItem.skeleton';

interface FaqListSkeletonProps {
	count?: number;
}

export const FaqListSkeleton = ({ count = 5 }: FaqListSkeletonProps) => {
	const { isMobile } = useScreenSize();

	return (
		<CardSkeleton>
			<Flex direction="column" gap={isMobile ? '16' : '24'}>
				<TextSkeleton variant="head3" width={250} />
				<Flex direction="column" gap="12">
					{Array.from({ length: count }).map((_, index) => (
						<FaqItemSkeleton key={index} />
					))}
				</Flex>
			</Flex>
		</CardSkeleton>
	);
};
