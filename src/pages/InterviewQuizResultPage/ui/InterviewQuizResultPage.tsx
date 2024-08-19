import { i18Namespace } from '@/shared/config/i18n';
import { formatDate } from '@/shared/helpers/formatDate';
import { formatTime } from '@/shared/helpers/formatTime';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Block } from '@/shared/ui/Block';
import { PassedQuestionStatInfo } from '@/shared/ui/PassedQuestionStatInfo';

import { MOCK_QUIZ } from '@/entities/quiz';

import { PassedInterviewStat, PassedQuestionChart } from '@/widgets/Charts';
import { InterviewQuestionHeader } from '@/widgets/InterviewQuestions';
import { PassedQuestionsList } from '@/widgets/PassedQuestions';

import styles from './InterviewResultPage.module.css';

const InterviewQuizResultPage = () => {
	const { t } = useI18nHelpers(i18Namespace.interviewQuizResult);
	const { passedCount, allCount, date, duration, title, questions, stats, totalAttempts } =
		MOCK_QUIZ;

	const questionStats = [
		{
			title: t('questionStats.passed'),
			value: `${passedCount}/${allCount}`,
		},
		{
			title: t('questionStats.timeSpent'),
			value: formatTime(new Date(date)),
		},
		{
			title: t('questionStats.date'),
			value: formatDate(new Date(date)),
		},
		{
			title: t('questionStats.duration'),
			value: duration,
		},
	];

	return (
		<div className={styles.container}>
			<Block>
				<div className={styles.result}>
					<InterviewQuestionHeader
						title={t('resultInterview.resultTitle', null, { title })}
						centered
					/>
					<PassedInterviewStat totalAttempt={totalAttempts} attemptData={stats} />
				</div>
			</Block>
			<div className={styles.stats}>
				<Block className={styles.block}>
					<div className={styles.progress}>
						<InterviewQuestionHeader title={t('resultInterview.questionTitle')} centered />
						<PassedQuestionChart total={allCount} learned={passedCount} />
					</div>
				</Block>
				<PassedQuestionStatInfo stats={questionStats} />
			</div>
			<Block className={styles.passed}>
				<div className={styles['passed-list']}>
					<InterviewQuestionHeader title={t('resultInterview.allPassedQuestionTitle')} centered />
					<PassedQuestionsList questions={questions} />
				</div>
			</Block>
		</div>
	);
};

export default InterviewQuizResultPage;
