import { Flex } from '@/shared/ui/Flex';

import { AdvantagesBlockSkeleton } from '@/widgets/Landing/AdvantagesBlock';
import { GurusBlockSkeleton } from '@/widgets/Landing/GurusBlock';
import { MentorsBlockSkeleton } from '@/widgets/Landing/MentorsBlock';

export const LearningPageSkeleton = () => {
	return (
		<>
			<Flex gap="100" direction="column">
				<AdvantagesBlockSkeleton />
				<MentorsBlockSkeleton />
				<GurusBlockSkeleton />
			</Flex>
		</>
	);
};
