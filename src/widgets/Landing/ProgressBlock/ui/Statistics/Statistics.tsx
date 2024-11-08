import Progress from '@/shared/assets/icons/progress.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import styles from './Statistics.module.css';

export const Statistics = () => {
	const { t } = useI18nHelpers(i18Namespace.landing);

	return (
		<div className={styles.statistics}>
			<h3>{t(Landing.PROGRESS_BLOCK_INTERVIEW_STATISTICS)}</h3>

			<div className={styles['statistics-pie']}>
				<div className={styles.pie}>
					<p className={styles.label}>
						75%<span>{t(Landing.PROGRESS_BLOCK_DIAGRAM_LABEL)}</span>
					</p>

					<Progress className={styles['progress-icon']} />
				</div>
			</div>

			<ul className={styles['statistics-list']}>
				<li>
					{t(Landing.PROGRESS_BLOCK_ALL_QUESTIONS)}
					<span>20</span>
				</li>
				<li>
					{t(Landing.PROGRESS_BLOCK_NEW_QUESTIONS)}
					<span>120</span>
				</li>
				<li>
					{t(Landing.PROGRESS_BLOCK_UNLEARNED)}
					<span>50</span>
				</li>
				<li>
					{t(Landing.PROGRESS_BLOCK_LEARNED)}
					<span>12</span>
				</li>
			</ul>
		</div>
	);
};
