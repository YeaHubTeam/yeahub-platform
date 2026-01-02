import { Flex } from '@/shared/ui/Flex';

import { AdvantagesBlock } from '../AdvantagesBlock/AdvantagesBlock';
import { GurusBlock } from '../GurusBlock/GurusBlock';
import { MentorsBlock } from '../MentorsBlock/MentorsBlock';

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
