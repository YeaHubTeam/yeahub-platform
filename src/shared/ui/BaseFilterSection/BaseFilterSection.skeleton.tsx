import { Flex } from '@/shared/ui/Flex';
import { FlexGap } from '@/shared/ui/Flex/types';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import { BaseFilterSectionProps } from './BaseFilterSection';

export const BaseFilterSectionSkeleton = <T,>({
	length,
	width,
	gap = '8',
}: Partial<BaseFilterSectionProps<T>> & { width?: number; length: number; gap?: FlexGap }) => {
	return (
		<Flex direction="column" gap={gap}>
			<TextSkeleton variant="body2" width={100} />
			<Flex wrap="wrap" gap="8">
				{[...Array(length)].map((_, index) => (
					<Skeleton width={width || 100} height={40} borderRadius={12} key={index} />
				))}
			</Flex>
		</Flex>
	);
};
