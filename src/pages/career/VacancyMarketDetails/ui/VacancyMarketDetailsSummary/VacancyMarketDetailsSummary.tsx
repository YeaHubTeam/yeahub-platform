import growthChart from '@/shared/assets/images/growthChart.png';
import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import styles from './VacancyMarketDetailsSummary.module.css';

interface VacancyMarketSummaryProps {
	title: string;
	total: number;
	note: string;
	shortNote: string;
}

export const VacancyMarketDetailsSummary = ({
	title,
	total,
	note,
	shortNote,
}: VacancyMarketSummaryProps) => {
	const { isMobileM, isMobile } = useScreenSize();
	return (
		<Flex className={styles.summary} direction={isMobileM ? 'column' : 'row'}>
			<Flex flex={1} align="center" gap="16" className={styles['summary-total']}>
				<img
					src={growthChart}
					width={44}
					height={44}
					alt="growth-chart"
					aria-hidden
					className={styles['growth-chart']}
				/>
				<Flex direction="column" gap="4">
					<Text variant="body3-accent">{title}</Text>
					<Text variant="body5-accent" color="purple-700">
						{total}
					</Text>
				</Flex>
			</Flex>
			<Flex
				flex={1}
				justify={isMobileM ? 'start' : 'end'}
				gap="8"
				align="center"
				className={styles['summary-note']}
			>
				<Icon icon="info" color="black-500" size={18} />
				<Text variant="body2-accent" color="black-500">
					{isMobile ? shortNote : note}
				</Text>
			</Flex>
		</Flex>
	);
};
