import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import { Advantages } from '../Advantages/Advantages';
import { Control } from '../Control/Control';

import styles from './InterviewModeBlock.module.css';

export const InterviewModeBlock = () => {
	const { t } = useI18nHelpers(i18Namespace.landing);

	return (
		<section className={styles['interview-mode-block']}>
			<h2 className={styles.title}>
				<div>{t(Landing.INTERVIEW_MODE)}</div>
			</h2>
			<div className={styles.container}>
				<div className={styles.interface}>
					<div className={styles['progress-bar']}>
						<div></div>
						<span>{t(Landing.INTERVIEW_PROGRESS)}</span>
					</div>
					<div className={styles.question}>
						<h3>{t(Landing.SAMPLE_QUESTION)}</h3>

						<div className={styles['img-container']}></div>

						<p>{t(Landing.VIEW_ANSWER)}</p>
					</div>

					<Control />
				</div>

				<Advantages />
			</div>
		</section>
	);
};
