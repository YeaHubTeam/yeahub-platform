import { useTranslation } from 'react-i18next';

import { i18Namespace, Vacancies } from '@/shared/config';
import { GaugeChart } from '@/shared/ui/charts';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

interface ProgressCircleProps {
	percent?: number;
	matched?: number;
	total?: number;
	priority?: number;
}

export const ProgressCircle = ({ percent, matched, total, priority }: ProgressCircleProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);
	const progress = Math.min(Math.max(percent ?? priority ?? 0, 0), 100);

	return (
		<Flex direction="column" gap="12" align="center">
			<GaugeChart
				percent={progress}
				size={99}
				strokeWidth={7.5}
				progressColor="var(--color-purple-700)"
				backgroundColor="#FFFFFF"
				backgroundStrokeColor="var(--color-purple-200)"
				sizeText="medium"
			/>
			<Text variant="body3" color="black-500">
				{priority
					? t(Vacancies.RESUME_ANALYZER_METRIC_COVERAGE)
					: t(Vacancies.RESUME_ANALYZER_METRIC_MATCHED, {
							matched: matched ?? 0,
							total: total ?? 0,
						})}
			</Text>
		</Flex>
	);
};
