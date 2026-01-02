import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { MostDifficultQuestionsWidgetSkeleton } from '../MostDifficultQuestionsWidget/MostDifficultQuestionsWidget.skeleton';
import { PopularQuestionsWidgetSkeleton } from '../PopularQuestionsWidget/PopularQuestionsWidget.skeleton';
import { PopularSkillsWidgetSkeleton } from '../PopularSkillsWidget/PopularSkillsWidget.skeleton';
import { SkillsProficiencyWidgetSkeleton } from '../SkillsProficiencyWidget/SkillsProficiencyWidget.skeleton';
import { SpecializationProgressWidgetSkeleton } from '../SpecializationProgressWidget/SpecializationProgressWidget.skeleton';

// import { UsersRatingWidgetSkeleton } from '../UsersRatingWidget/UsersRatingWidget.skeleton';

export const AnalyticsPageSkeleton = () => {
	const { isSmallScreen, isLaptop, isTablet } = useScreenSize();

	return (
		<Flex wrap={isSmallScreen ? 'wrap' : 'nowrap'} gap="20">
			<Flex direction="column" gap="20" maxWidth={isSmallScreen}>
				{/*<UsersRatingWidgetSkeleton />*/}
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
