import { useTranslation } from 'react-i18next';

import Progress from '@/shared/assets/icons/progress.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { InterviewStatistics } from '@/shared/config/i18n/i18nTranslations';

import styles from './Statistics.module.css';

export const Statistics = () => {
	const { t } = useTranslation(i18Namespace.interviewStatistics);

	return (
		<div className={styles.statistics}>
			<h3>{t(InterviewStatistics.QUESTION_STATS_TITLE_SHORT)}</h3>

			<div className={styles['statistics-pie']}>
				<div className={styles.pie}>
					<p className={styles.label}>
						75%<span>{t(InterviewStatistics.PASSED)}</span>
					</p>

					<Progress className={styles['progress-icon']} />
				</div>
			</div>

			<ul className={styles['statistics-list']}>
				<li>
					{t(InterviewStatistics.QUESTION_STATS_ALL)}
					<span>120</span>
				</li>
				<li>
					{t(InterviewStatistics.QUESTION_STATS_NEW)}
					<span>50</span>
				</li>
				<li>
					{t(InterviewStatistics.QUESTION_STATS_IN_PROCESS)}
					<span>60</span>
				</li>
				<li>
					{t(InterviewStatistics.QUESTION_STATS_LEARNED)}
					<span>20</span>
				</li>
			</ul>
		</div>
	);
};
