import { Flex } from '@/shared/ui/Flex';

import { PopularQuestions } from '@/widgets/analytics/PopularQuestions';
import { PopularSkills } from '@/widgets/analytics/PopularSkills';
import { SkillsProficiency } from '@/widgets/analytics/SkillsProficiency';

export const AnalyticsPage = () => {
	return (
		<Flex wrap="wrap" gap="20">
			<SkillsProficiency />
			<PopularSkills />
			<PopularQuestions />
		</Flex>
	);
};
