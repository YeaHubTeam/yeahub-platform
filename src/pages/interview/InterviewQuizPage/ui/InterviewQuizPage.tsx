import { useState } from 'react';

import { i18Namespace } from '@/shared/config/i18n';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';

import { getProfileId } from '@/entities/profile';
import {
	InterviewSlider,
	QuestionNavPanel,
	QuestionProgressBar,
	getActiveQuizQuestions,
	useGetActiveQuizQuery,
	useSaveQuizResultMutation,
	useSlideSwitcher,
	getIsAllQuestionsAnswered,
} from '@/entities/quiz';

import styles from './InterviewQuizPage.module.css';

const InterviewQuizPage = () => {
	const [isAnswerVisible, setIsAnswerVisible] = useState(false);

	const { t } = useI18nHelpers(i18Namespace.interviewQuiz);

	const profileId = useAppSelector(getProfileId);
	const { data: activeQuiz } = useGetActiveQuizQuery({
		profileId,
		page: 1,
		limit: 1,
	});
	const [saveResult] = useSaveQuizResultMutation();

	const activeQuizQuestions = useAppSelector(getActiveQuizQuestions);
	const isAllQuestionsAnswered = useAppSelector(getIsAllQuestionsAnswered);

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

	const handlePrevSlide = () => {
		setIsAnswerVisible(false);
		goToPrevSlide();
	};

	const handleRightSlide = () => {
		setIsAnswerVisible(false);
		goToNextSlide();
	};

	const isLastQuestion = activeQuestion === totalCount;
	const isNextButton = !isLastQuestion && !isAllQuestionsAnswered;
	const isDisabled = (isLastQuestion && !isAllQuestionsAnswered) || (!isLastQuestion && !answer);

	const handleSubmitQuiz = () => {
		if (activeQuiz) {
			const quizToSave = {
				...activeQuiz.data[0],
				response: {
					answers: activeQuizQuestions,
				},
			};

			saveResult(quizToSave);
		}
	};

	return (
		<div className={styles.container}>
			<Card>
				<div className={styles['progress-bar']}>
					<p className={styles['progress-bar-title']}>{t('title')}</p>
					<span className={styles['progress-num']}>
						{activeQuestion}/{totalCount}
					</span>
					<QuestionProgressBar
						className={styles['progress-component']}
						currentCount={currentCount}
						totalCount={totalCount}
					/>
				</div>
			</Card>
			<Card>
				<div className={styles.question}>
					<QuestionNavPanel
						className={styles['slider-navigation']}
						goToNextSlide={handleRightSlide}
						goToPrevSlide={handlePrevSlide}
						answer={answer}
						changeAnswer={changeAnswer}
						questionNumber={activeQuestion}
						totalCount={totalCount}
					/>
					<InterviewSlider
						id={questionId}
						title={questionTitle}
						imageSrc={imageSrc}
						shortAnswer={shortAnswer ?? ''}
						answer={answer}
						changeAnswer={changeAnswer}
						isAnswerVisible={isAnswerVisible}
						setIsAnswerVisible={setIsAnswerVisible}
					/>
					<Button
						className={styles['end-button']}
						onClick={isNextButton ? handleRightSlide : handleSubmitQuiz}
						disabled={isDisabled}
					>
						{isNextButton ? t('buttons.next') : t('buttons.complete')}
					</Button>
				</div>
			</Card>
		</div>
	);
};

export default InterviewQuizPage;
