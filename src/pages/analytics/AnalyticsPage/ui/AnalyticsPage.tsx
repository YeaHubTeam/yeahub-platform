import { Flex } from '@/shared/ui/Flex';

import { PopularSkills } from '@/widgets/analytics/PopularSkills';
import { SkillsProficiency } from '@/widgets/analytics/SkillsProficiency';
import { SpecializationsProgress } from '@/widgets/analytics';

export const AnalyticsPage = () => {
	return (
		<Flex wrap="wrap" gap="20">
			<SkillsProficiency />
			<PopularSkills />
			<SpecializationsProgress />
		</Flex>
	);
};
