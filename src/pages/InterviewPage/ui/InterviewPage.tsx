import { useMemo } from 'react';

import NoActiveQuizPlaceholder from '@/shared/assets/images/NoActiveQuizPlaceholder.png';
import { i18Namespace } from '@/shared/config/i18n';
import { Interview } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Card } from '@/shared/ui/Card';
import { Loader } from '@/shared/ui/Loader';
import { PassedQuestionStatInfo } from '@/shared/ui/PassedQuestionStatInfo';

import { useProfileQuery } from '@/entities/auth';
import { getActiveQuizQuestions, useGetActiveQuizQuery } from '@/entities/quiz';

import { PassedQuestionChart } from '@/widgets/Charts';
import { InterviewHistoryList } from '@/widgets/InterviewHistory';
import { QuestionLargePreview } from '@/widgets/InterviewPreparation';
import { QuestionProgressBarBlock } from '@/widgets/InterviewPreparation';
import { InterviewQuestionsList } from '@/widgets/InterviewQuestions';

import styles from './InterviewPage.module.css';

const InterviewPage = () => {
	const { t } = useI18nHelpers(i18Namespace.interview);

	const questionStats = [
		{
			title: 'Всего вопросов',
			value: '120',
		},
		{
			title: 'Не изучено',
			value: '40',
		},
		{
			title: 'Изучено',
			value: '20',
		},
	];

	const { data: profile } = useProfileQuery();
	const { isLoading: isActiveQuizLoading } = useGetActiveQuizQuery({
		profileId: profile?.profiles[0].profileId,
		params: { limit: 1, page: 1 },
	});

	const activeQuizQuestions = useAppSelector(getActiveQuizQuestions);

	const preparationWidgetQuestion = useMemo(() => {
		if (!activeQuizQuestions || !activeQuizQuestions.length) return null;

		const questionWithoutAnswer =
			activeQuizQuestions.find((question) => !question.answer) ?? activeQuizQuestions[0];
		const questionIndexWithoutAnswer = activeQuizQuestions.findIndex(
			(question) => !question.answer,
		);
		return {
			question: questionWithoutAnswer,
			fromQuestionNumber: questionIndexWithoutAnswer >= 0 ? questionIndexWithoutAnswer + 1 : 1,
			toQuestionNumber: activeQuizQuestions.length,
		};
	}, [activeQuizQuestions]);

	return (
		<div className={styles.container}>
			<Card
				title={t(Interview.PREPARATION_TITLE)}
				actionTitle={t(
					preparationWidgetQuestion
						? Interview.PREPARATION_ACTIVELINKTEXT
						: Interview.PREPARATION_NOACTIVELINKTEXT,
				)}
				actionRoute={
					preparationWidgetQuestion ? ROUTES.interview.quiz.new.page : ROUTES.interview.quiz.page
				}
				withShadow
			>
				{isActiveQuizLoading ? (
					<Loader />
				) : (
					<div className={styles.preparation}>
						<div className={styles['preparation-wrapper']}>
							{preparationWidgetQuestion ? (
								<>
									<QuestionProgressBarBlock
										fromQuestionNumber={preparationWidgetQuestion.fromQuestionNumber}
										toQuestionNumber={preparationWidgetQuestion.toQuestionNumber}
									/>
									<QuestionLargePreview question={preparationWidgetQuestion.question} />
								</>
							) : (
								<>
									<h2 className={styles['inactive-title']}>
										{t(Interview.PREPARATION_NOACTIVETITLE)}
									</h2>
									<p className={styles['inactive-description']}>
										{t(Interview.PREPARATION_NOACTIVEDESCRIPTION)}
									</p>
									<img
										className={styles['preparation-noactiveimage']}
										src={NoActiveQuizPlaceholder}
										alt="no active quiz"
									/>
								</>
							)}
						</div>
					</div>
				)}
			</Card>
			<Card
				isActionPositionBottom
				title={t('stats.title')}
				actionTitle={t('stats.linkText')}
				actionRoute={ROUTES.interview.statistic.page}
			>
				<div className={styles.statistics}>
					<PassedQuestionChart total={120} learned={20} />
					<PassedQuestionStatInfo stats={questionStats} />
				</div>
			</Card>
			<Card
				title={t('questions.title')}
				actionTitle={t('questions.studied')}
				actionRoute={ROUTES.interview.questions.page}
				withShadow
			>
				<div className={styles.questions}>
					<InterviewQuestionsList />
				</div>
			</Card>
			<Card
				actionRoute={ROUTES.interview.history.page}
				actionTitle={t('history_preparation.linkText')}
				title={t('history_preparation.title')}
				withShadow
			>
				<div className={styles.history}>
					<InterviewHistoryList />
				</div>
			</Card>
		</div>
	);
};

export default InterviewPage;
