import Progress from '@/shared/assets/icons/progress.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import cls from './Statistics.module.css';

export const Statistics = () => {
	const { t } = useI18nHelpers(i18Namespace.landing);

	return (
		<div className={cls.statistics}>
			<h3>{t(Landing.PROGRESS_BLOCK_INTERVIEW_STATISTICS)}</h3>

			<div className={cls['statistics-pie']}>
				<div className={cls.pie}>
					<p className={cls.label}>
						75%<span>{t(Landing.PROGRESS_BLOCK_DIAGRAM_LABEL)}</span>
					</p>

					<Progress className={cls['progress-icon']} />
				</div>
			</div>

			<ul className={cls['statistics-list']}>
				<li>
					{t(Landing.PROGRESS_BLOCK_ALL_QUESTIONS)}
					<span>120</span>
				</li>
				<li>
					{t(Landing.PROGRESS_BLOCK_LEARNED)}
					<span>50</span>
				</li>
				<li>
					{t(Landing.PROGRESS_BLOCK_UNLEARNED)}
					<span>20</span>
				</li>
			</ul>
		</div>
	);
};
