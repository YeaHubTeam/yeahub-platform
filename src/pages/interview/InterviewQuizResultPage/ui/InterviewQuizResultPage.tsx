import { useParams } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuizResult } from '@/shared/config/i18n/i18nTranslations';
import { formatDate } from '@/shared/helpers/formatDate';
import { formatTime, getTimeDifference } from '@/shared/helpers/formatTime';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { PassedQuestionStatInfo } from '@/shared/ui/PassedQuestionStatInfo';

import { getProfileId } from '@/entities/profile';
import { useGetQuizByProfileIdQuery } from '@/entities/quiz';

import { PassedInterviewStat, PassedQuestionChart } from '@/widgets/Charts';
import { InterviewQuestionHeader } from '@/widgets/InterviewQuestions';
import { PassedQuestionsList } from '@/widgets/PassedQuestions';

import { getInterviewStats } from '../model/getInterviewStast';

import styles from './InterviewResultPage.module.css';

const InterviewQuizResultPage = () => {
	const { t } = useI18nHelpers(i18Namespace.interviewQuizResult);
	const profileId = useAppSelector(getProfileId);
	const { quizId } = useParams<{ quizId?: string }>();

	const { data, isLoading } = useGetQuizByProfileIdQuery({
		quizId: quizId ?? '',
		profileId: profileId ?? '',
	});

	const questions = data?.response.answers;
	const interviewStats = getInterviewStats(questions);

	const learnedQuestions = (data?.questions || []).filter((question) => question.isLearned).length;

	const questionStats = [
		{
			title: t(InterviewQuizResult.QUESTIONSTATS_PASSED),
			value: `${learnedQuestions}/${data?.fullCount}`,
		},
		{
			title: t(InterviewQuizResult.QUESTIONSTATS_TIMESPENT),
			value: formatTime(new Date((data?.startDate as string) ?? new Date().toDateString())),
		},
		{
			title: t(InterviewQuizResult.QUESTIONSTATS_DATE),
			value: formatDate(
				new Date((data?.startDate as string) ?? new Date().toDateString()),
				'dd.MM.yyyy',
			),
		},
		{
			title: t(InterviewQuizResult.QUESTIONSTATS_DURATION),
			value: getTimeDifference(data?.startDate ?? '', data?.endDate ?? ''),
		},
	];

	return (
		<div className={styles.container}>
			<Card>
				<Flex direction="column" align="center" className={styles.result}>
					<InterviewQuestionHeader
						title={t('resultInterview.resultTitle', { title: data?.quizNumber })}
						centered
					/>
					<PassedInterviewStat
						isLoading={isLoading}
						totalAttempt={interviewStats?.questionsTotalCount ?? 0}
						attemptData={interviewStats?.stats ?? []}
					/>
				</Flex>
			</Card>
			<Flex direction="column" align="center" gap="12" justify="between">
				<Card className={styles.block}>
					<Flex gap="20" direction="column" align="center">
						<InterviewQuestionHeader title={t('resultInterview.questionTitle')} centered />
						<PassedQuestionChart
							isLoading={isLoading}
							total={data?.fullCount ?? 1}
							learned={data?.successCount ?? 0}
						/>
					</Flex>
				</Card>
				<PassedQuestionStatInfo stats={questionStats} />
			</Flex>
			<Card className={styles.passed}>
				<Flex direction="column" gap="24">
					<InterviewQuestionHeader title={t('resultInterview.allPassedQuestionTitle')} centered />
					<PassedQuestionsList questions={questions ?? []} />
				</Flex>
			</Card>
		</div>
	);
};

export default InterviewQuizResultPage;
