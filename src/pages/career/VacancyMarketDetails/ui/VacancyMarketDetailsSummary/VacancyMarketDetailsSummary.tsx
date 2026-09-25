import GrowthChart from '@/shared/assets/images/growthChart.png';
import { Card } from '@/shared/ui/Card';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import styles from './VacancyMarketDetailsSummary.module.css';

interface VacancyMarketSummaryProps {
	title: string;
	total: number;
	note: string;
}

export const VacancyMarketDetailsSummary = ({ title, total, note }: VacancyMarketSummaryProps) => {
	return (
		<Card
			size="small"
			withOutsideShadow
			className={styles.summary}
			classNameContent={styles.content}
		>
			<div className={styles.main}>
				<div className={styles['icon-slot']}>
					<img
						src={GrowthChart}
						width={44}
						height={44}
						alt=""
						aria-hidden
						className={styles['growth-chart']}
					/>
				</div>

				<div className={styles.value}>
					<Text variant="body1" color="black-900" className={styles.title}>
						{title}
					</Text>

					<Text variant="body3-accent" color="purple-700" className={styles.count}>
						{total}
					</Text>
				</div>
			</div>

			<div className={styles.note}>
				<Icon
					icon="info"
					// size={16}
					aria-hidden
				/>

				<Text variant="body1" color="black-600" className={styles['note-text']}>
					{note}
				</Text>
			</div>
		</Card>
	);
};
