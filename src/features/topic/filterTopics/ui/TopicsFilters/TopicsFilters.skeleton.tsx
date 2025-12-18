import { Flex } from '@/shared/ui/Flex';

import { SkillsListFieldSkeleton } from '@/entities/skill';

export const TopicsFiltersSkeleton = () => {
	return (
		<Flex direction="column" gap="24">
			<SkillsListFieldSkeleton />
		</Flex>
	);
};
