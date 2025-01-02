import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewStatistics } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Card } from '@/shared/ui/Card';
import { PassedQuestionStatInfo } from '@/shared/ui/PassedQuestionStatInfo';

import { getProfileId } from '@/entities/profile';
import { useGetProfileQuizStatsQuery } from '@/entities/quiz';

import {
	PassedInterviewStat,
	PassedQuestionChart,
	ProgressByCategoriesList,
} from '@/widgets/Charts';
import { InterviewHistoryList } from '@/widgets/InterviewHistory';

import { InterviewStatisticsPageSkeleton } from '@/pages/interview/InterviewStatisticsPage/ui/InterviewStatisticsPage.skeleton';

import { transformSkillsArray } from '../model/helpers/transformSkillsArray';

import styles from './InterviewStatisticsPage.module.css';

const InterviewStatisticsPage = () => {
	const { t } = useTranslation(i18Namespace.interviewStatistics);
	const profileId = useAppSelector(getProfileId);
	const { data: profileStats, isLoading } = useGetProfileQuizStatsQuery(profileId ?? '');

	const { isMobile } = useScreenSize();

	if (isLoading) {
		return <InterviewStatisticsPageSkeleton />;
	}

	const questionStats = [
		{
			title: t(InterviewStatistics.QUESTION_STATS_ALL),
			value: `${profileStats?.questionsStat?.uniqueQuestionsCount ?? 0}`,
			route: `${ROUTES.interview.questions.page}?page=1&status=all`,
		},
		{
			title: t(InterviewStatistics.QUESTION_STATS_NEW),
			value: `${profileStats?.questionsStat?.unlearnedQuestionsCount ?? 0}`,
			route: `${ROUTES.interview.questions.page}?page=1&status=not-learned`,
		},
		{
			title: t(InterviewStatistics.QUESTION_STATS_IN_PROCESS),
			value: `${profileStats?.questionsStat?.inProgressQuestionsCount ?? 0}`,
			route: `${ROUTES.interview.questions.page}?page=1&status=not-learned`,
		},
		{
			title: t(InterviewStatistics.QUESTION_STATS_LEARNED),
			value: `${profileStats?.questionsStat?.learnedQuestionsCount ?? 0}`,
			route: `${ROUTES.interview.questions.page}?page=1&status=learned`,
		},
	];

	const totalAttempt = profileStats?.quizzesStat?.quizzesCount ?? 0;
	const attemptStats = [
		{
			value: profileStats?.quizzesStat?.maxQuizResult ?? 0,
			name: isMobile
				? t(InterviewStatistics.ATTEMPT_STATS_BEST_MOBILE)
				: t(InterviewStatistics.ATTEMPT_STATS_BEST),
			itemStyle: { color: '#400799' },
		},
		{
			value: profileStats?.quizzesStat?.minQuizResult ?? 0,
			name: isMobile
				? t(InterviewStatistics.ATTEMPT_STATS_WORST_MOBILE)
				: t(InterviewStatistics.ATTEMPT_STATS_WORST),
			itemStyle: { color: '#E1CEFF' },
		},
		{
			value: profileStats?.quizzesStat?.avgQuizResult ?? 0,
			name: isMobile
				? t(InterviewStatistics.ATTEMPT_STATS_AVG_MOBILE)
				: t(InterviewStatistics.ATTEMPT_STATS_AVG),
			itemStyle: { color: '#6A0BFF' },
		},
	];

	return (
		<div className={styles.container}>
			<Card
				className={styles['interview-statistics']}
				isTitleCenter
				title={t(InterviewStatistics.ATTEMPT_STATS_TITLE)}
			>
				<PassedInterviewStat
					totalAttempt={totalAttempt}
					attemptData={attemptStats}
					isLoading={isLoading}
				/>
			</Card>
			<Card
				className={styles.block}
				isTitleCenter
				title={t(InterviewStatistics.QUESTION_STATS_TITLE)}
			>
				<div className={styles.questions}>
					{profileStats && (
						<PassedQuestionChart
							total={profileStats.questionsStat.uniqueQuestionsCount}
							learned={profileStats.questionsStat.learnedQuestionsCount}
							isLoading={isLoading}
						/>
					)}
					<PassedQuestionStatInfo stats={questionStats} />
				</div>
			</Card>
			<InterviewHistoryList className={styles['history-list']} />
			<Card className={styles.category} title={t(InterviewStatistics.PROGRESS_TITLE)}>
				<ProgressByCategoriesList
					optionData={profileStats ? transformSkillsArray(profileStats) : []}
				/>
			</Card>
		</div>
	);
};

export default InterviewStatisticsPage;
