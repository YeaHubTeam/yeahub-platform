import { GaugeChart } from '@/shared/ui/charts';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './VacancyMarketProgressGauge.module.css';

interface VacancyMarketProgressGaugeProps {
	title: string;
	displayedPercent: number;
}

export const VacancyMarketProgressGauge = ({
	title,
	displayedPercent,
}: VacancyMarketProgressGaugeProps) => {
	return (
		<Flex direction="row" gap="10" className={styles.container} align="center">
			<GaugeChart
				percent={displayedPercent}
				sizeCircle={48}
				widthCircle={3}
				color="#6A0BFF"
				backColor="#E1CEFF"
				fillColor="#ffffff"
				text={false}
				textVariant="body3-accent"
				textColor="black-900"
			/>
			<Text variant="body3-accent">{title}</Text>
		</Flex>
	);
};
