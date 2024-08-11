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
	useGetActiveQuizzesQuery,
} from '@/entities/quiz';

import styles from './InterviewQuizPage.module.css';

const InterviewQuizPage = () => {
	const { data: userProfile } = useGetProfileQuery();
	const { data: quizData } = useGetActiveQuizzesQuery({
		profileId: userProfile?.profiles[0].profileId || '',
		params: {
			page: 1,
			limit: 1,
		},
	});

	const { t } = useI18nHelpers(i18Namespace.interviewQuiz);

	const getQuizzes = () => {
		const answers = quizData?.data[0].response.answers;
		const questions = quizData?.data[0].questions;
		const quizzes = answers?.map((item) => {
			const matchedQuestion = questions?.find((question) => question.id === item.questionId);
			return {
				...item,
				imageSrc: matchedQuestion?.imageSrc,
				shortAnswer: matchedQuestion?.shortAnswer,
			};
		});
		return quizzes;
	};

	const quizzes = getQuizzes();

	const {
		questionId,
		questionTitle,
		imageSrc,
		longAnswer,
		currentCount,
		totalCount,
		goToNextSlide,
		goToPrevSlide,
	} = useSlideSwitcher(quizzes ?? []);

	return (
		<div className={styles.container}>
			<Block>
				<div className={styles['progress-bar']}>
					<p className={styles['progress-bar-title']}>{t('progressBarTitle')}</p>
					<span className={styles['progress-num']}>
						{currentCount}/{totalCount}
					</span>
					<QuestionProgressBar className={styles['progress-component']} />
				</div>
			</Block>
			<Block>
				<div className={styles.question}>
					<QuestionNavPanel
						className={styles['slider-navigation']}
						goToNextSlide={goToNextSlide}
						goToPrevSlide={goToPrevSlide}
					/>
					<InterviewSlider
						id={questionId}
						title={questionTitle}
						imageSrc={imageSrc}
						longAnswer={longAnswer ?? ''}
					/>
					<Button className={styles['end-button']}>{t('completeQuizButton')}</Button>
				</div>
			</Block>
		</div>
	);
};

export default InterviewQuizPage;
