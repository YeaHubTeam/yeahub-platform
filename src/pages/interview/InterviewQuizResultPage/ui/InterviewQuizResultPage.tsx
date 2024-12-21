import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuizResult } from '@/shared/config/i18n/i18nTranslations';
import { formatDate } from '@/shared/helpers/formatDate';
import { formatTime, getTimeDifference } from '@/shared/helpers/formatTime';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { PassedQuestionStatInfo } from '@/shared/ui/PassedQuestionStatInfo';

import { getProfileId } from '@/entities/profile';
import { useGetQuizByProfileIdQuery } from '@/entities/quiz';

import { PassedInterviewStat, PassedQuestionChart } from '@/widgets/Charts';
import { PassedQuestionsList } from '@/widgets/PassedQuestions';

import { InterviewQuizResultPageSkeleton } from '@/pages/interview/InterviewQuizResultPage';

import { getInterviewStats } from '../model/getInterviewStast';

import styles from './InterviewQuizResultPage.module.css';

const InterviewQuizResultPage = () => {
	const { t } = useTranslation(i18Namespace.interviewQuizResult);
	const profileId = useAppSelector(getProfileId);
	const { quizId } = useParams<{ quizId?: string }>();

	const { data, isLoading } = useGetQuizByProfileIdQuery({
		quizId: quizId ?? '',
		profileId,
	});

	if (isLoading) {
		return <InterviewQuizResultPageSkeleton />;
	}

	const questions = data?.response.answers;
	const interviewStats = getInterviewStats(questions);

	const learnedQuestions = (data?.questions || []).filter((question) => question.isLearned).length;

	const questionStats = [
		{
			title: t(InterviewQuizResult.PASSED_QUESTION),
			value: `${learnedQuestions ?? 0}/${data?.fullCount ?? 0}`,
		},
		{
			title: t(InterviewQuizResult.TIME),
			value: formatTime(new Date((data?.startDate as string) ?? new Date().toDateString())),
		},
		{
			title: t(InterviewQuizResult.DATE),
			value: formatDate(
				new Date((data?.startDate as string) ?? new Date().toDateString()),
				'dd.MM.yyyy',
			),
		},
		{
			title: t(InterviewQuizResult.DURATION),
			value: getTimeDifference(data?.startDate ?? '', data?.endDate ?? ''),
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<Card
					className={styles.results}
					isTitleCenter
					title={t(InterviewQuizResult.TITLE_QUESTIONS_ANSWERS, { title: data?.quizNumber })}
				>
					<PassedInterviewStat
						isLoading={isLoading}
						totalAttempt={interviewStats?.questionsTotalCount ?? 0}
						attemptData={interviewStats?.stats ?? []}
					/>
				</Card>
				<Card className={styles.block} isTitleCenter title={t(InterviewQuizResult.TITLE_STAT)}>
					<Flex gap="20" direction="column" align="center" justify="center">
						<PassedQuestionChart
							isLoading={isLoading}
							total={data?.fullCount ?? 1}
							learned={data?.successCount ?? 0}
						/>
						<PassedQuestionStatInfo stats={questionStats} />
					</Flex>
				</Card>
			</div>
			<Card
				className={styles.passed}
				isTitleCenter
				title={t(InterviewQuizResult.TITLE_QUESTIONS_LIST)}
			>
				<PassedQuestionsList questions={questions ?? []} />
			</Card>
		</div>
	);
};

export default InterviewQuizResultPage;
