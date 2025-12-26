import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { MostDifficultQuestionsWidgetSkeleton } from '@/widgets/analytics/MostDifficultQuestionsWidget';
import { PopularQuestionsWidgetSkeleton } from '@/widgets/analytics/PopularQuestionsWidget';
import { PopularSkillsWidgetSkeleton } from '@/widgets/analytics/PopularSkillsWidget';
import { SkillsProficiencyWidgetSkeleton } from '@/widgets/analytics/SkillsProficiencyWidget';
import { SpecializationProgressWidgetSkeleton } from '@/widgets/analytics/SpecializationProgressWidget';
import { UsersRatingWidgetSkeleton } from '@/widgets/analytics/UsersRatingWidget';

export const AnalyticsPageSkeleton = () => {
	const { isSmallScreen, isLaptop, isTablet } = useScreenSize();

	return (
		<Flex wrap={isSmallScreen ? 'wrap' : 'nowrap'} gap="20">
			<Flex direction="column" gap="20" maxWidth={isSmallScreen}>
				<UsersRatingWidgetSkeleton />
				<Flex direction={isTablet || isLaptop ? 'row' : 'column'} gap="20" maxWidth={isSmallScreen}>
					<SkillsProficiencyWidgetSkeleton />
					<MostDifficultQuestionsWidgetSkeleton />
				</Flex>
			</Flex>
			<Flex style={{ maxWidth: '100%' }} direction="column" gap="20" flex={1}>
				<SpecializationProgressWidgetSkeleton />
				<PopularQuestionsWidgetSkeleton />
				<PopularSkillsWidgetSkeleton />
			</Flex>
		</Flex>
	);
};
