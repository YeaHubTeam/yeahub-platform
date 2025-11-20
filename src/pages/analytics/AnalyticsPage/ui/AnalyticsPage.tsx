import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';

import { MostDifficultQuestionsWidget } from '@/widgets/analytics/MostDifficultQuestionsWidget';
import { PopularQuestionsWidget } from '@/widgets/analytics/PopularQuestionsWidget';
import { PopularSkillsWidget } from '@/widgets/analytics/PopularSkillsWidget';
import { SkillsProficiencyWidget } from '@/widgets/analytics/SkillsProficiencyWidget';
import { SpecializationProgressWidget } from '@/widgets/analytics/SpecializationProgressWidget';

export const AnalyticsPage = () => {
	const { isSmallScreen, isLaptop, isTablet } = useScreenSize();

	return (
		<Flex wrap={isSmallScreen ? 'wrap' : 'nowrap'} gap="20">
			<Flex direction={isTablet || isLaptop ? 'row' : 'column'} gap="20" maxWidth={isSmallScreen}>
				<SkillsProficiencyWidget />
				<MostDifficultQuestionsWidget />
			</Flex>
			<Flex style={{ maxWidth: '100%' }} direction="column" gap="20" flex={1}>
				<SpecializationProgressWidget />
				<PopularQuestionsWidget />
				<PopularSkillsWidget />
			</Flex>
		</Flex>
	);
};
