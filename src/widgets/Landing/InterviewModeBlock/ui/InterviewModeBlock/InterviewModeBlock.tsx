import { Link } from 'react-router-dom';
import { Icon } from 'yeahub-ui-kit';

import QuizExample from '@/shared/assets/images/landing/quiz-example.png';
import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
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
					<div className={styles['interface-header']}>
						<h3 className={styles['interface-caption']}>{t(Landing.PREPARATION_TITLE)}</h3>
						<div>
							<Link to={ROUTES.interview.page} className={styles['interface-link']}>
								<span>{t(Landing.PREPARATION_LINK)}</span>
								<Icon
									icon="arrowRight"
									color="--palette-ui-purple-700"
									size={24}
									className={styles['interface-icon']}
								/>
							</Link>
						</div>
					</div>
					<div className={styles['interface-body']}>
						<div className={styles['progress-bar']}>
							<div></div>
							<span>{t(Landing.INTERVIEW_PROGRESS)}</span>
						</div>
						<div className={styles.question}>
							<h3>{t(Landing.SAMPLE_QUESTION)}</h3>
							<img
								className={styles.image}
								src={QuizExample}
								alt="quiz example"
								loading="lazy"
								width={613}
								height={189}
							/>
						</div>
						<Control />
					</div>
				</div>

				<Advantages />
			</div>
		</section>
	);
};
