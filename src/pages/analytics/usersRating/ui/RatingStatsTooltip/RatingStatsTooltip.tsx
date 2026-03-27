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

	const items: { value: number | string; label: string }[] = [
		{
			label: t(Analytics.USERS_RATING_TOOLTIP_USERS_COUNT),
			value: allUsers,
		},
		{
			label: t(Analytics.USERS_RATING_TOOLTIP_QUESTIONS_COUNT),
			value: allQuestions,
		},
		{
			label: t(Analytics.USERS_RATING_TOOLTIP_PROGRESS),
			value: `${averageProgress}%`,
		},
	];

	return (
		<Flex direction="column" gap="8">
			{items.map(({ value, label }) => (
				<Flex key={label} justify="between">
					<Text variant="body3">{label}</Text>
					<Text variant="body3">{value}</Text>
				</Flex>
			))}
		</Flex>
	);
};
