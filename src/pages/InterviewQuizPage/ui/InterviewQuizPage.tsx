import { useSelector } from 'react-redux';
import { Button } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Block } from '@/shared/ui/Block';

import { useGetProfileQuery } from '@/entities/auth';
import { QuestionProgressBar } from '@/entities/interview';
import { QuestionNavPanel } from '@/entities/interview';
import { useSlideSwitcher } from '@/entities/interview';
import { InterviewSlider } from '@/entities/interview';
import { useGetActiveQuizzesQuery } from '@/entities/quiz';

import { getInterviewQuizPageState } from '../model/selectors/interviewQuizPageSelectors';

import styles from './InterviewQuizPage.module.css';

const InterviewQuizPage = () => {
	const { data: userProfile } = useGetProfileQuery();
	const { page, limit } = useSelector(getInterviewQuizPageState);
	const { data: quizData } = useGetActiveQuizzesQuery({
		profileId: userProfile?.profiles[0].profileId || '',
		params: {
			page,
			limit,
		},
	});

	const { t } = useI18nHelpers(i18Namespace.interviewQuiz);

	const quizzes = quizData?.data.flatMap((item) => item.response.answers);
	const { questionId, questionTitle, imageSrc, answer, goToNextSlide, goToPrevSlide } =
		useSlideSwitcher(quizzes ?? []);

	return (
		<div className={styles.container}>
			<Block>
				<div className={styles['progress-bar']}>
					<p className={styles['progress-bar-title']}>{t('progressBarTitle')}</p>
					<span className={styles['progress-num']}>10/45</span>
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
						longAnswer={answer ?? ''}
					/>
					<Button className={styles['end-button']}>{t('completeQuizButton')}</Button>
				</div>
			</Block>
		</div>
	);
};

export default InterviewQuizPage;
