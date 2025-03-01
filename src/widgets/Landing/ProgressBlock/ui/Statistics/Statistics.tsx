import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewStatistics } from '@/shared/config/i18n/i18nTranslations';
import { GaugeChart } from '@/shared/ui/charts/GaugeChart';

import styles from './Statistics.module.css';

export const Statistics = () => {
	const { t } = useTranslation(i18Namespace.interviewStatistics);

	return (
		<div className={styles.statistics}>
			<h3>{t(InterviewStatistics.QUESTION_STATS_TITLE_SHORT)}</h3>

			<div className={styles['statistics-pie']}>
				<GaugeChart total={10} learned={10} percent={75} />
			</div>

			<ul className={styles['statistics-list']}>
				<li>
					{t(InterviewStatistics.QUESTION_STATS_ALL)}
					<span>20</span>
				</li>
				<li>
					{t(InterviewStatistics.QUESTION_STATS_NEW)}
					<span>120</span>
				</li>
				<li>
					{t(InterviewStatistics.QUESTION_STATS_IN_PROCESS)}
					<span>50</span>
				</li>
				<li>
					{t(InterviewStatistics.QUESTION_STATS_LEARNED)}
					<span>12</span>
				</li>
			</ul>
		</div>
	);
};
