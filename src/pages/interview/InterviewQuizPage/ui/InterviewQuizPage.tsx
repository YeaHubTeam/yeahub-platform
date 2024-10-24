import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { ROUTES } from '@/shared/config/router/routes';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useCheckSpecialization } from '@/shared/hooks/useCheckSpecialization';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Card } from '@/shared/ui/Card';
import { RedirectToProfile } from '@/shared/ui/RedirectToProfile';

import { useProfileQuery } from '@/entities/auth';
import {
	InterviewSlider,
	QuestionNavPanel,
	QuestionProgressBar,
	getActiveQuizQuestions,
	getIsAllQuestionsAnswered,
	useGetActiveQuizQuery,
	useSaveQuizResultMutation,
	useSlideSwitcher,
} from '@/entities/quiz';

import styles from './InterviewQuizPage.module.css';
import { InterviewQuizPageSkeleton } from './InterviewQuizPage.skeleton';

const InterviewQuizPage = () => {
	const [isAnswerVisible, setIsAnswerVisible] = useState(false);

	const { t } = useI18nHelpers(i18Namespace.interviewQuiz);

	const { data: userProfile } = useProfileQuery();
	const navigate = useNavigate();
	const isSpecializationEmpty = useCheckSpecialization(userProfile);

	const { data: activeQuiz, isLoading } = useGetActiveQuizQuery({
		profileId: userProfile?.profiles[0].id || '',
		params: {
			page: 1,
			limit: 1,
		},
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

	if (isLoading) return <InterviewQuizPageSkeleton />;

	if (isSpecializationEmpty) navigate(ROUTES.interview.page);

	return (
		<div className={styles.container}>
			{isSpecializationEmpty ? (
				<RedirectToProfile />
			) : (
				<>
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
					<Card className={styles['question-card']}>
						<div className={styles.question}>
							<QuestionNavPanel
								className={styles['slider-navigation']}
								goToNextSlide={goToNextSlide}
								goToPrevSlide={goToPrevSlide}
								answer={answer}
								changeAnswer={changeAnswer}
								setIsAnswerVisible={setIsAnswerVisible}
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
								onClick={isNextButton ? goToNextSlide : handleSubmitQuiz}
								disabled={isDisabled}
							>
								{isNextButton ? t('buttons.next') : t('buttons.complete')}
							</Button>
						</div>
					</Card>
				</>
			)}
		</div>
	);
};

export default InterviewQuizPage;
