import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import { useAppSelector, useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { getIsVerified } from '@/entities/profile';

import { MostDifficultQuestionsWidget } from '../MostDifficultQuestionsWidget/MostDifficultQuestionsWidget';
import { PopularQuestionsWidget } from '../PopularQuestionsWidget/PopularQuestionsWidget';
import { PopularSkillsWidget } from '../PopularSkillsWidget/PopularSkillsWidget';
import { SkillsProficiencyWidget } from '../SkillsProficiencyWidget/SkillsProficiencyWidget';
import { SpecializationProgressWidget } from '../SpecializationProgressWidget/SpecializationProgressWidget';

// import { UsersRatingWidget } from '../UsersRatingWidget/UsersRatingWidget';

export const AnalyticsPage = () => {
	const { isSmallScreen, isLaptop, isTablet } = useScreenSize();
	const navigate = useNavigate();
	const isVerified = useAppSelector(getIsVerified);

	useEffect(() => {
		if (!isVerified) {
			navigate(ROUTES.interview.page);
		}
	}, [isVerified, navigate]);

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
