import { BaseFilterSectionSkeleton } from '@/shared/ui/BaseFilterSection';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { TaskDifficultyChipSkeleton } from '@/entities/task';

export const TaskAdditionalInfoSkeleton = () => {
	return (
		<Flex direction="column" gap="20">
			<CardSkeleton withOutsideShadow>
				<Flex direction="column" gap="24">
					<BaseFilterSectionSkeleton length={3} />
					<BaseFilterSectionSkeleton length={3} />
					<Flex direction="column" gap="8">
						<TextSkeleton variant="body2" width={150} />
						<TaskDifficultyChipSkeleton />
					</Flex>
					<BaseFilterSectionSkeleton length={2} />
				</Flex>
			</CardSkeleton>
		</Flex>
	);
};
