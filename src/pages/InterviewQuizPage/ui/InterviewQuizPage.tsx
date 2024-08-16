import { useSelector } from 'react-redux';
import { Button } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Block } from '@/shared/ui/Block';

import { useGetProfileQuery } from '@/entities/auth';
import {
	QuestionProgressBar,
	QuestionNavPanel,
	InterviewSlider,
	useSlideSwitcher,
	useGetActiveQuizQuery,
	useSaveQuizResultMutation,
	getActiveQuizQuestions,
	getActiveQuiz,
} from '@/entities/quiz';

import styles from './InterviewQuizPage.module.css';

const InterviewQuizPage = () => {
	const { t } = useI18nHelpers(i18Namespace.interviewQuiz);
	const { data: userProfile } = useGetProfileQuery();
	useGetActiveQuizQuery({
		profileId: userProfile?.profiles[0].profileId || '',
		params: {
			page: 1,
			limit: 1,
		},
	});
	const [saveResult] = useSaveQuizResultMutation();

	const activeQuizQuestions = useSelector(getActiveQuizQuestions);
	const activeQuiz = useSelector(getActiveQuiz);

	const {
		questionId,
		questionTitle,
		imageSrc,
		shortAnswer,
		currentCount,
		activeQuestion,
		totalCount,
		answer,
		changeAnswer,
		goToNextSlide,
		goToPrevSlide,
	} = useSlideSwitcher(activeQuizQuestions ?? []);

	const handleSubmitQuiz = () => {
		const quizToSave = {
			...activeQuiz,
			response: {
				answers: activeQuizQuestions,
			},
		};
		saveResult(quizToSave);
	};

	return (
		<div className={styles.container}>
			<Block>
				<div className={styles['progress-bar']}>
					<p className={styles['progress-bar-title']}>{t('progressBarTitle')}</p>
					<span className={styles['progress-num']}>
						{activeQuestion}/{totalCount}
					</span>
					<QuestionProgressBar
						className={styles['progress-component']}
						currentCount={currentCount}
						totalCount={totalCount}
					/>
				</div>
			</Block>
			<Block>
				<div className={styles.question}>
					<QuestionNavPanel
						className={styles['slider-navigation']}
						goToNextSlide={goToNextSlide}
						goToPrevSlide={goToPrevSlide}
						answer={answer}
						changeAnswer={changeAnswer}
					/>
					<InterviewSlider
						id={questionId}
						title={questionTitle}
						imageSrc={imageSrc}
						shortAnswer={shortAnswer ?? ''}
						answer={answer}
						changeAnswer={changeAnswer}
					/>
					<Button
						className={styles['end-button']}
						disabled={currentCount !== totalCount}
						onClick={handleSubmitQuiz}
					>
						{t('completeQuizButton')}
					</Button>
				</div>
			</Block>
		</div>
	);
};

export default InterviewQuizPage;
