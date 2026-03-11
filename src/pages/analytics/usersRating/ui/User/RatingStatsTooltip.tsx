import { useTranslation } from 'react-i18next';

import { Analytics, i18Namespace } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

interface RatingStatsTooltipProps {
	allUsers: number;
	allQuestions: number;
	averageProgress: number;
}

export const RatingStatsTooltip = ({
	allUsers,
	allQuestions,
	averageProgress,
}: RatingStatsTooltipProps) => {
	const { t } = useTranslation(i18Namespace.analytics);

	const items = [
		t(Analytics.USERS_RATING_TOOLTIP_USERS_COUNT, { usersCount: allUsers }),
		t(Analytics.USERS_RATING_TOOLTIP_QUESTIONS_COUNT, { allQuestions }),
		t(Analytics.USERS_RATING_TOOLTIP_PROGRESS, { averageProgress }),
	];

	return (
		<Flex direction="column" gap="8">
			{items.map((text) => (
				<Text key={text} variant="body3">
					{text}
				</Text>
			))}
		</Flex>
	);
};
