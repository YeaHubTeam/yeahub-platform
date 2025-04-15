import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import QuizExample from '@/shared/assets/images/landing/quiz-example.avif';
import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuiz, Landing } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { Icon } from '@/shared/ui/Icon';

import { Advantages } from '../Advantages/Advantages';
import { Control } from '../Control/Control';

import styles from './InterviewModeBlock.module.css';

export const InterviewModeBlock = () => {
	const { t } = useTranslation([i18Namespace.interviewQuiz]);

	return (
		<section className={styles['interview-mode-block']}>
			<h2 className={styles.title}>
				<div>{t(Landing.INTERVIEW_TITLE, { ns: i18Namespace.landing })}</div>
			</h2>
			<div className={styles.container}>
				<div className={styles.interface}>
					<div className={styles['interface-header']}>
						<h3 className={styles['interface-caption']}>{t(InterviewQuiz.PREVIEW_TITLE)}</h3>
						<div>
							<Link to={ROUTES.interview.page} className={styles['interface-link']}>
								<span>{t(InterviewQuiz.START_QUIZ_LINK)}</span>
								<Icon
									icon="arrowRight"
									color="purple-700"
									size={24}
									className={styles['interface-icon']}
								/>
							</Link>
						</div>
					</div>
					<div className={styles['interface-body']}>
						<div className={styles['progress-bar']}>
							<div></div>
							<span>
								{t(InterviewQuiz.PROGRESS_BAR_TITLE, {
									fromQuestionNumber: 10,
									toQuestionNumber: 45,
								})}
							</span>
						</div>
						<div className={styles.question}>
							<h3>{t(Landing.QUESTIONS_FIRST, { ns: i18Namespace.landing })}</h3>
							<img
								className={styles.image}
								src={QuizExample}
								alt="Топ-10 вопросов собеседований"
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
