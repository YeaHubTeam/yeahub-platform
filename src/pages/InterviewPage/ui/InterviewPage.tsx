import { useCallback, useEffect } from 'react';

import { i18Namespace } from '@/shared/config/i18n';
import { ROUTES } from '@/shared/config/router/routes';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Card } from '@/shared/ui/Card';
import { PassedQuestionStatInfo } from '@/shared/ui/PassedQuestionStatInfo';

import { useProfileQuery } from '@/entities/auth';
import { useGetActiveQuizQuery } from '@/entities/quiz';

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
	const { data: activeQuiz } = useGetActiveQuizQuery({
		profileId: profile?.profiles[0].profileId,
		params: { limit: 1, page: 1 },
	});

	const findPreparationWidgetQuestion = useCallback(() => {
		if (!activeQuiz) return null;

		const lastActiveQuiz = activeQuiz.data[0];
		if (!lastActiveQuiz) return null;

		return {
			question:
				lastActiveQuiz.response.answers.length >= lastActiveQuiz.questions.length
					? lastActiveQuiz.questions[lastActiveQuiz.questions.length - 1]
					: lastActiveQuiz.questions[lastActiveQuiz.response.answers.length - 1],
			toQuestionNumber: lastActiveQuiz.questions.length,
			fromQuestionNumber:
				lastActiveQuiz.questions.length - lastActiveQuiz.response.answers.length > 0
					? lastActiveQuiz.response.answers.length
					: lastActiveQuiz.questions.length,
		};
	}, [activeQuiz]);

	const preparationWidgetQuestion = findPreparationWidgetQuestion();

	useEffect(() => {
		console.log(findPreparationWidgetQuestion());
	}, [activeQuiz]);

	return (
		<div className={styles.container}>
			<Card
				title={t('preparation.title')}
				actionTitle={t('preparation.linkText')}
				actionRoute={
					preparationWidgetQuestion ? ROUTES.interview.quiz.new.page : ROUTES.interview.quiz.page
				}
				withShadow
			>
				{/* {preparationWidgetQuestion && (
					<div className={styles.preparation}>
						<InterviewPreparationHeader
							link={activeQuiz ? ROUTES.interview.quiz.page : ROUTES.interview.quiz.new.page}
							active={!!preparationWidgetQuestion}
							title={t(Interview.PREPARATION_TITLE)}
						/>

						<div className={styles['preparation-wrapper']}>
							<QuestionProgressBarBlock
								fromQuestionNumber={preparationWidgetQuestion.fromQuestionNumber}
								toQuestionNumber={preparationWidgetQuestion.toQuestionNumber}
							/>
							<QuestionLargePreview question={preparationWidgetQuestion.question} />
						</div>
					</div>
				)} */}
				{preparationWidgetQuestion && (
					<div className={styles.preparation}>
						<div className={styles['preparation-wrapper']}>
							<QuestionProgressBarBlock
								fromQuestionNumber={preparationWidgetQuestion.fromQuestionNumber}
								toQuestionNumber={preparationWidgetQuestion.toQuestionNumber}
							/>
							<QuestionLargePreview question={preparationWidgetQuestion.question} />
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
