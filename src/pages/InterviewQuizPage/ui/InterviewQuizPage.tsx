import { useState } from 'react';
import { Button } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Card } from '@/shared/ui/Card';

import { useProfileQuery } from '@/entities/auth';
import {
	InterviewSlider,
	QuestionNavPanel,
	QuestionProgressBar,
	getActiveQuizQuestions,
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
	const { data: activeQuiz, isLoading } = useGetActiveQuizQuery({
		profileId: userProfile?.profiles[0].id || '',
		params: {
			page: 1,
			limit: 1,
		},
	});
	const [saveResult, { isLoading: isLoadingAfterSave }] = useSaveQuizResultMutation();

	const activeQuizQuestions = useAppSelector(getActiveQuizQuestions);

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
			<Card className={styles['question-card']}>
				<div className={styles.question}>
					<QuestionNavPanel
						className={styles['slider-navigation']}
						goToNextSlide={goToNextSlide}
						goToPrevSlide={goToPrevSlide}
						answer={answer}
						changeAnswer={changeAnswer}
						setIsAnswerVisible={setIsAnswerVisible}
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
						disabled={currentCount !== totalCount || isLoadingAfterSave}
						onClick={handleSubmitQuiz}
					>
						{t('buttons.complete')}
					</Button>
				</div>
			</Card>
		</div>
	);
};

export default InterviewQuizPage;
