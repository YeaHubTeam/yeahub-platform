import { Flex } from '@/shared/ui/Flex';

import { AdvantagesBlock } from '@/widgets/Landing/AdvantagesBlock';
import { MentorsBlock } from '@/widgets/Landing/MentorsBlock';

export const LearningPage = () => {
	return (
		<>
			<Flex gap="100" direction="column">
				<AdvantagesBlock />
				<MentorsBlock />
			</Flex>
		</>
	);
};
