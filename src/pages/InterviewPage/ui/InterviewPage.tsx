import { useCallback, useEffect } from 'react';

import { i18Namespace } from '@/shared/config/i18n';
import { Interview } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Block } from '@/shared/ui/Block';
import { LinkWithArrowRight } from '@/shared/ui/LinkWithArrowRight';
import { PassedQuestionStatInfo } from '@/shared/ui/PassedQuestionStatInfo';

import { useProfileQuery } from '@/entities/auth';
import { useGetActiveQuizQuery } from '@/entities/quiz';

import { PassedQuestionChart } from '@/widgets/Charts';
import { InterviewHistoryHeader, InterviewHistoryList } from '@/widgets/InterviewHistory';
import { QuestionProgressBarBlock } from '@/widgets/InterviewPreparation';
import { InterviewPreparationHeader } from '@/widgets/InterviewPreparation';
import { QuestionLargePreview } from '@/widgets/InterviewPreparation';
import { InterviewQuestionHeader, InterviewQuestionsList } from '@/widgets/InterviewQuestions';

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
			<Block>
				{preparationWidgetQuestion && (
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
				)}
			</Block>
			<Block>
				<div className={styles.statistics}>
					<InterviewQuestionHeader title={t(Interview.STATS_TITLE)} />
					<PassedQuestionChart total={120} learned={20} />
					<PassedQuestionStatInfo stats={questionStats} />
					<LinkWithArrowRight
						link={ROUTES.interview.statistic.page}
						linkTitle={t(Interview.STATS_LINKTEXT)}
					/>
				</div>
			</Block>
			<Block>
				<div className={styles.questions}>
					<InterviewQuestionHeader
						title={t(Interview.QUESTIONS_TITLE)}
						linkTitle={t(Interview.QUESTIONS_STUDIED, 'Изучить')}
					/>
					<LinkWithArrowRight
						link={ROUTES.interview.questions.page}
						linkTitle={t(Interview.QUESTIONS_STUDIED)}
					/>
					<InterviewQuestionsList />
				</div>
			</Block>
			<Block>
				<div className={styles.history}>
					<InterviewHistoryHeader title={t(Interview.HISTORY_PREPARATION_TITLE)} />
					<LinkWithArrowRight
						link={ROUTES.interview.history.page}
						linkTitle={t(Interview.HISTORY_PREPARATION_LINKTEXT)}
					/>
					<InterviewHistoryList />
				</div>
			</Block>
		</div>
	);
};

export default InterviewPage;
