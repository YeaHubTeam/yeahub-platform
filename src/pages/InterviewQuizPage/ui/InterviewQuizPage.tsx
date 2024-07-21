import { Button } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Block } from '@/shared/ui/Block';

import { QuestionProgressBar } from '@/entities/interview';
import { QuestionNavPanel } from '@/entities/interview';
import { INTERVIEW_QUESTIONS } from '@/entities/interview';
import { useSlideSwitcher } from '@/entities/interview';
import { InterviewSlider } from '@/entities/interview';

import styles from './InterviewQuizPage.module.css';

const InterviewQuizPage = () => {
	const { t } = useI18nHelpers(i18Namespace.interviewQuiz);
	const { id, title, imageSrc, longAnswer, goToNextSlide, goToPrevSlide } =
		useSlideSwitcher(INTERVIEW_QUESTIONS);
	return (
		<div className={styles.container}>
			<Block>
				<div className={styles['progress-bar-title']}>
					<p>{t('progressBarTitle', 'Вопросы собеседования')}</p>
					<span className={styles['progress-num']}>10/45</span>
				</div>
				<QuestionProgressBar />
			</Block>
			<Block>
				<QuestionNavPanel
					showResponseButtons={false}
					goToNextSlide={goToNextSlide}
					goToPrevSlide={goToPrevSlide}
				/>
				<InterviewSlider id={id} title={title} imageSrc={imageSrc} longAnswer={longAnswer ?? ''} />
				<Button className={styles['end-button']}>{t('completeQuizButton', 'Завершить')}</Button>
			</Block>
		</div>
	);
};

export default InterviewQuizPage;
