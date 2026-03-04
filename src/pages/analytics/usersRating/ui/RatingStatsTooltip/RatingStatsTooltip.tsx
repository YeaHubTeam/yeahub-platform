import { useTranslation } from 'react-i18next';

import { i18Namespace, Analytics } from '@/shared/config';
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

	return (
		<Flex direction="column" gap="8">
			<Flex justify="between" gap="24">
				<Text variant="body3">{t(Analytics.USERS_RATING_TOOLTIP_USERS_COUNT)}</Text>
				<Text variant="body3-strong">{allUsers}</Text>
			</Flex>
			<Flex justify="between" gap="24">
				<Text variant="body3">{t(Analytics.USERS_RATING_TOOLTIP_QUESTIONS_COUNT)}</Text>
				<Text variant="body3-strong">{allQuestions}</Text>
			</Flex>
			<Flex justify="between" gap="24">
				<Text variant="body3">{t(Analytics.USERS_RATING_TOOLTIP_PROGRESS)}</Text>
				<Text variant="body3-strong">{averageProgress}%</Text>
			</Flex>
		</Flex>
	);
};
