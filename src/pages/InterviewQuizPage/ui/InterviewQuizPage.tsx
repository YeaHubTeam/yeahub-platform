import { Button } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Block } from '@/shared/ui/Block';
import { Loader } from '@/shared/ui/Loader';

import { useProfileQuery } from '@/entities/auth';
import {
	QuestionProgressBar,
	QuestionNavPanel,
	InterviewSlider,
	useSlideSwitcher,
	useGetActiveQuizQuery,
	useSaveQuizResultMutation,
	getActiveQuizQuestions,
	getQuizStartDate,
} from '@/entities/quiz';

import styles from './InterviewQuizPage.module.css';

const InterviewQuizPage = () => {
	const { t } = useI18nHelpers(i18Namespace.interviewQuiz);

	const { data: userProfile } = useProfileQuery();
	const { data: activeQuiz, isLoading } = useGetActiveQuizQuery({
		profileId: userProfile?.profiles[0].profileId || '',
		params: {
			page: 1,
			limit: 1,
		},
	});
	const [saveResult, { isLoading: isLoadingAfterSave }] = useSaveQuizResultMutation();

	const activeQuizStartDate = useAppSelector(getQuizStartDate);
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

	if (isLoading) {
		return <Loader />;
	}

	const handleSubmitQuiz = () => {
		if (activeQuiz) {
			const quizToSave = {
				...activeQuiz.data[0],
				startDate: activeQuizStartDate,
				response: {
					answers: activeQuizQuestions,
				},
			};

			saveResult(quizToSave);
		}
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
						disabled={currentCount !== totalCount || isLoadingAfterSave}
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
