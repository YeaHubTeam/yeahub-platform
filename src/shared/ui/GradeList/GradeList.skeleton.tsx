import { Flex } from '@/shared/ui/Flex';
import { GradeChipSkeleton } from '@/shared/ui/GradeChip';

import { GradeListProps } from './GradeList';

export const GradeListSkeleton = ({ className, size }: Partial<GradeListProps>) => {
	return (
		<Flex componentType="ul" gap="24" className={className}>
			<GradeChipSkeleton size={size} />
			<GradeChipSkeleton size={size} />
		</Flex>
	);
};
