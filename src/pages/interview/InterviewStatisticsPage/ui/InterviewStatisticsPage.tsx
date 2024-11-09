import { i18Namespace } from '@/shared/config/i18n';
import { InterviewStatistics } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Card } from '@/shared/ui/Card';
import { PassedQuestionStatInfo } from '@/shared/ui/PassedQuestionStatInfo';

import { useProfileQuery } from '@/entities/auth';
import { useGetProfileStatsQuery } from '@/entities/quiz';

import {
	PassedInterviewStat,
	PassedQuestionChart,
	ProgressByCategoriesList,
} from '@/widgets/Charts';
import { InterviewHistoryList } from '@/widgets/InterviewHistory';
import { InterviewQuestionHeader } from '@/widgets/InterviewQuestions';

import { transformSkillsArray } from '../model/helpers/transformSkillsArray';

import styles from './InterviewStatisticsPage.module.css';

const InterviewStatisticsPage = () => {
	const { t } = useI18nHelpers(i18Namespace.interviewStatistics);
	const { data: profileId } = useProfileQuery();
	const { data: profileStats, isLoading } = useGetProfileStatsQuery(
		profileId?.profiles[0].id ?? '',
	);

	const questionStats = [
		{
			title: t(InterviewStatistics.QUESTIONSTATS_ALLQUESTIONS),
			value: `${profileStats?.questionsStat?.uniqueQuestionsCount ?? 0}`,
			route: `${ROUTES.interview.questions.page}?page=1&status=all`,
		},
		{
			title: t(InterviewStatistics.QUESTIONSTATS_NEWQUESTIONS),
			value: `${profileStats?.questionsStat?.unlearnedQuestionsCount ?? 0}`,
			route: `${ROUTES.interview.questions.page}?page=1&status=not-learned`,
		},
		{
			title: t(InterviewStatistics.QUESTIONSTATS_INPROCESS),
			value: `${profileStats?.questionsStat?.inProgressQuestionsCount ?? 0}`,
			route: `${ROUTES.interview.questions.page}?page=1&status=not-learned`,
		},
		{
			title: t(InterviewStatistics.QUESTIONSTATS_LEARNED),
			value: `${profileStats?.questionsStat?.learnedQuestionsCount ?? 0}`,
			route: `${ROUTES.interview.questions.page}?page=1&status=learned`,
		},
	];

	const totalAttempt = profileStats?.quizzesStat?.quizzesCount ?? 0;
	const attemptStats = [
		{
			value: profileStats?.quizzesStat?.maxQuizResult ?? 0,
			name: t(InterviewStatistics.ATTEMPTSTATS_BESTRESULT),
			itemStyle: { color: '#400799' },
		},
		{
			value: profileStats?.quizzesStat?.minQuizResult ?? 0,
			name: t(InterviewStatistics.ATTEMPTSTATS_WORSTRESULT),
			itemStyle: { color: '#E1CEFF' },
		},
		{
			value: profileStats?.quizzesStat?.avgQuizResult ?? 0,
			name: t(InterviewStatistics.ATTEMPTSTATS_AVGRESULT),
			itemStyle: { color: '#6A0BFF' },
		},
	];

	return (
		<div className={styles.container}>
			<Card>
				<div className={styles.attempt}>
					<InterviewQuestionHeader title={t('attemptStats.title')} centered />
					<PassedInterviewStat
						totalAttempt={totalAttempt}
						attemptData={attemptStats}
						isLoading={isLoading}
					/>
				</div>
			</Card>
			<div className={styles.progress}>
				<Card className={styles.block}>
					<div className={styles.questions}>
						<InterviewQuestionHeader title={t('questionStats.title')} centered />
						{profileStats && (
							<PassedQuestionChart
								total={profileStats.questionsStat.uniqueQuestionsCount}
								learned={profileStats.questionsStat.learnedQuestionsCount}
								isLoading={isLoading}
							/>
						)}
					</div>
				</Card>
				<PassedQuestionStatInfo stats={questionStats} />
			</div>
			<Card>
				<InterviewHistoryList className={styles.history} />
			</Card>
			<Card className={styles.category} expandable>
				<div className={styles['category-progress']}>
					<InterviewQuestionHeader title={t('progress.title')} />
					<ProgressByCategoriesList
						optionData={profileStats ? transformSkillsArray(profileStats) : []}
					/>
				</div>
			</Card>
		</div>
	);
};

export default InterviewStatisticsPage;
