import { BaseFilterSectionSkeleton } from '@/shared/ui/BaseFilterSection';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { TaskDifficultyChipSkeleton } from '@/entities/task';

export const TaskAdditionalInfoSkeleton = () => {
	return (
		<CardSkeleton withOutsideShadow>
			<Flex direction="column" gap="24">
				<Flex direction="column" gap="16">
					<BaseFilterSectionSkeleton length={3} />
				</Flex>
				<BaseFilterSectionSkeleton length={3} />
				<Flex direction="column" gap="16">
					<TextSkeleton variant="body3" width={150} />
					<TaskDifficultyChipSkeleton />
				</Flex>
				<BaseFilterSectionSkeleton length={2} />
			</Flex>
		</CardSkeleton>
	);
};
