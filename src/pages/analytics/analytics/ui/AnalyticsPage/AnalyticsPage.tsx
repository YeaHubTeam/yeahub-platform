import { useNavigate } from 'react-router-dom';

import { EMAIL_VERIFY_SETTINGS_TAB, useAppSelector, useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Stub } from '@/shared/ui/Stub';

import { getIsVerified } from '@/entities/profile';

import { MostDifficultQuestionsWidget } from '@/widgets/analytics/MostDifficultQuestionsWidget';
import { PopularQuestionsWidget } from '@/widgets/analytics/PopularQuestionsWidget';
import { PopularSkillsWidget } from '@/widgets/analytics/PopularSkillsWidget';
import { SkillsProficiencyWidget } from '@/widgets/analytics/SkillsProficiencyWidget';
import { SpecializationProgressWidget } from '@/widgets/analytics/SpecializationProgressWidget';
// import { UsersRatingWidget } from '@/widgets/analytics/UsersRatingWidget';

export const AnalyticsPage = () => {
	const { isSmallScreen, isLaptop, isTablet } = useScreenSize();
	const navigate = useNavigate();
	const isVerified = useAppSelector(getIsVerified);

	if (!isVerified) {
		return (
			<Flex justify="center" align="center" style={{ minHeight: '400px' }}>
				<Stub type="access-denied-verify" onClick={() => navigate(EMAIL_VERIFY_SETTINGS_TAB)} />
			</Flex>
		);
	}

	return (
		<Flex wrap={isSmallScreen ? 'wrap' : 'nowrap'} gap="20">
			<Flex direction="column" gap="20" maxWidth={isSmallScreen}>
				{/*<UsersRatingWidget />*/}
				<Flex direction={isTablet || isLaptop ? 'row' : 'column'} gap="20" maxWidth={isSmallScreen}>
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
	);
};
