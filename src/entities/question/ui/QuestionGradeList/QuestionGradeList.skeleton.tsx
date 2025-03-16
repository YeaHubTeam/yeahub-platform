import { Flex } from '@/shared/ui/Flex';
import { GradeChipSkeleton } from '@/shared/ui/GradeChip';

import { QuestionGradeListProps } from './QuestionGradeList';

export const QuestionGradeListSkeleton = ({ className }: Partial<QuestionGradeListProps>) => {
	return (
		<Flex componentType="ul" gap="16" className={className}>
			<GradeChipSkeleton />
			<GradeChipSkeleton />
		</Flex>
	);
};
