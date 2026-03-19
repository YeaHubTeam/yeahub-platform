import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { WithFeature } from '@/entities/featureFlag';

import { MostDifficultQuestionsWidget } from '@/widgets/analytics/MostDifficultQuestionsWidget';
import { PopularQuestionsWidget } from '@/widgets/analytics/PopularQuestionsWidget';
import { PopularSkillsWidget } from '@/widgets/analytics/PopularSkillsWidget';
import { SkillsProficiencyWidget } from '@/widgets/analytics/SkillsProficiencyWidget';
import { SpecializationProgressWidget } from '@/widgets/analytics/SpecializationProgressWidget';
import { UsersRatingWidget } from '@/widgets/analytics/UsersRatingWidget';
import { PageWrapper } from '@/widgets/PageWrapper';

export const AnalyticsPage = () => {
	const { isSmallScreen, isLaptop, isTablet } = useScreenSize();

	return (
		<PageWrapper
			shouldVerify
			hasData
			stubs={{}}
			content={
				<Flex wrap={isSmallScreen ? 'wrap' : 'nowrap'} gap="20">
					<Flex direction="column" gap="20" maxWidth={isSmallScreen}>
						<WithFeature featureId="usersRating">
							<UsersRatingWidget />
						</WithFeature>
						<Flex
							direction={isTablet || isLaptop ? 'row' : 'column'}
							gap="20"
							maxWidth={isSmallScreen}
						>
							<SkillsProficiencyWidget />
							<MostDifficultQuestionsWidget />
						</Flex>
					</Flex>
					<Flex style={{ maxWidth: '100%' }} direction="column" gap="20" flex={1}>
						<SpecializationProgressWidget />
						<PopularQuestionsWidget />
						<PopularSkillsWidget />
					</Flex>
				</Flex>
			}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};
