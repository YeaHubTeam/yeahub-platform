import { Flex } from '@/shared/ui/Flex';

import { AdvantagesBlock } from '@/widgets/Landing/AdvantagesBlock';
import { GurusBlock } from '@/widgets/Landing/GurusBlock';
import { MentorsBlock } from '@/widgets/Landing/MentorsBlock';

const LearningPage = () => {
	return (
		<>
			<Flex gap="100" direction="column">
				<AdvantagesBlock />
				<MentorsBlock />
				<GurusBlock />
			</Flex>
		</>
	);
};

export default LearningPage;
