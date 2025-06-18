import { Flex } from '@/shared/ui/Flex';
import { GradeChipSkeleton } from '@/shared/ui/GradeChip';

import { QuestionGradeListProps } from './QuestionGradeList';

export const QuestionGradeListSkeleton = ({ className, size }: Partial<QuestionGradeListProps>) => {
	return (
		<Flex componentType="ul" gap="24" className={className}>
			<GradeChipSkeleton size={size} />
			<GradeChipSkeleton size={size} />
		</Flex>
	);
};
