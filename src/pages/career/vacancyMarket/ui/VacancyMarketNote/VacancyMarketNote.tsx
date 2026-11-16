import { useTranslation } from 'react-i18next';

import growthChart from '@/shared/assets/images/growthChart.png';
import { i18Namespace, VacanciesMarket } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { VacancyMarketOverview } from '@/entities/vacancy';

import styles from './VacancyMarketNote.module.css';

interface VacancyMarketNoteProps {
	totalAnalyzedVacancyCount: VacancyMarketOverview['totalAnalyzedVacancyCount'];
}

export const VacancyMarketNote = ({ totalAnalyzedVacancyCount }: VacancyMarketNoteProps) => {
	const { t } = useTranslation(i18Namespace.vacanciesMarket);
	const { isMobile } = useScreenSize();

	return (
		<Flex className={styles.summary} direction={isMobile ? 'column' : 'row'}>
			<Flex flex={1} align="center" gap="16" className={styles['summary-total']}>
				<img
					src={growthChart}
					width={44}
					height={44}
					alt=""
					aria-hidden
					className={styles['growth-chart']}
				/>
				<Flex direction="column" gap="4">
					<Text variant="body3-accent">{t(VacanciesMarket.SUMMARY_TOTAL_ANALYZED)}</Text>
					<Text variant="body5-accent" color="purple-700">
						{totalAnalyzedVacancyCount}
					</Text>
				</Flex>
			</Flex>
			<Flex
				flex={1}
				justify={isMobile ? 'start' : 'end'}
				gap="8"
				align="center"
				className={styles['summary-note']}
			>
				<Icon icon="info" color="black-500" size={18} />
				<Text variant="body3-accent" color="black-500">
					{t(VacanciesMarket.SUMMARY_UPDATED_DAILY)}
				</Text>
			</Flex>
		</Flex>
	);
};
