import { useParams } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { formatDate } from '@/shared/helpers/formatDate';
import { formatTime, getTimeDifference } from '@/shared/helpers/formatTime';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Block } from '@/shared/ui/Block';
import { PassedQuestionStatInfo } from '@/shared/ui/PassedQuestionStatInfo';

import { useProfileQuery } from '@/entities/auth';
import { useGetQuizByIdQuery } from '@/entities/quiz';
import { QuizByIdRequestParams } from '@/entities/quiz';

import { PassedInterviewStat, PassedQuestionChart } from '@/widgets/Charts';
import { InterviewQuestionHeader } from '@/widgets/InterviewQuestions';
import { PassedQuestionsList } from '@/widgets/PassedQuestions';

import { getInterviewStats } from '../model/getInterviewStast';

import styles from './InterviewResultPage.module.css';

const InterviewQuizResultPage = () => {
	const { t } = useI18nHelpers(i18Namespace.interviewQuizResult);
	const { data: profileId } = useProfileQuery();
	const { quizId } = useParams<QuizByIdRequestParams>();
	const { data, isLoading } = useGetQuizByIdQuery({
		quizId: quizId ?? '',
		profileId: profileId?.profiles[0].profileId ?? '',
	});
	const questions = data?.response.answers;
	const interviewStats = getInterviewStats(questions);
	const questionStats = [
		{
			title: t('questionStats.passed'),
			value: `${data?.successCount}/${data?.fullCount}`,
		},
		{
			title: t('questionStats.timeSpent'),
			value: formatTime(new Date((data?.startDate as string) ?? new Date().toDateString())),
		},
		{
			title: t('questionStats.date'),
			value: formatDate(
				new Date((data?.startDate as string) ?? new Date().toDateString()),
				'dd.MM.yyyy',
			),
		},
		{
			title: t('questionStats.duration'),
			value: getTimeDifference(data?.startDate ?? '', data?.endDate ?? ''),
		},
	];

	return (
		<div className={styles.container}>
			<Block>
				<div className={styles.result}>
					<InterviewQuestionHeader
						title={t('resultInterview.resultTitle', null, { title: data?.quizNumber })}
						centered
					/>
					<PassedInterviewStat
						isLoading={isLoading}
						totalAttempt={interviewStats?.questionsTotalCount ?? 0}
						attemptData={interviewStats?.stats ?? []}
					/>
				</div>
			</Block>
			<div className={styles.stats}>
				<Block className={styles.block}>
					<div className={styles.progress}>
						<InterviewQuestionHeader title={t('resultInterview.questionTitle')} centered />
						<PassedQuestionChart
							isLoading={isLoading}
							total={data?.fullCount ?? 1}
							learned={data?.successCount ?? 0}
						/>
					</div>
				</Block>
				<PassedQuestionStatInfo stats={questionStats} />
			</div>
			<Block className={styles.passed}>
				<div className={styles['passed-list']}>
					<InterviewQuestionHeader title={t('resultInterview.allPassedQuestionTitle')} centered />
					<PassedQuestionsList questions={questions ?? []} />
				</div>
			</Block>
		</div>
	);
};

export default InterviewQuizResultPage;
