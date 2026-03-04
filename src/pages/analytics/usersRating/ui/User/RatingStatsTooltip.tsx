import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config';
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
			<Text variant="body3">{t('users.rating.tooltip.users.count', { usersCount: allUsers })}</Text>
			<Text variant="body3">
				{t('users.rating.tooltip.questionsCount', { allQuestions: allQuestions })}
			</Text>
			<Text variant="body3">
				{t('users.rating.tooltip.progress', { averageProgress: averageProgress })}
			</Text>
		</Flex>
	);
};
