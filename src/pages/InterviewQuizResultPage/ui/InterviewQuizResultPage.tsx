import { formatDate } from '@/shared/helpers/formatDate';
import { formatTime } from '@/shared/helpers/formatTime';
import { Block } from '@/shared/ui/Block';
import { PassedQuestionStatInfo } from '@/shared/ui/PassedQuestionStatInfo';

import { MOCK_QUIZ } from '@/entities/interview';

import { PassedInterviewStat, PassedQuestionChart } from '@/widgets/Charts';
import { InterviewQuestionHeader } from '@/widgets/InterviewQuestions';
import { PassedQuestionsList } from '@/widgets/PassedQuestions';

import styles from './InterviewResultPage.module.css';

const InterviewQuizResultPage = () => {
	const { passedCount, allCount, date, duration, title, questions, stats, totalAttempts } =
		MOCK_QUIZ;

	const questionStats = [
		{
			title: 'Пройдено вопросов',
			value: `${passedCount}/${allCount}`,
		},
		{
			title: 'Время',
			value: formatTime(new Date(date)),
		},
		{
			title: 'Дата',
			value: formatDate(new Date(date)),
		},
		{
			title: 'Длительность',
			value: duration,
		},
	];

	return (
		<div className={styles.container}>
			<Block>
				<div className={styles.result}>
					<InterviewQuestionHeader title={`Результат собеседования ${title}`} centered />
					<PassedInterviewStat totalAttempt={totalAttempts} attemptData={stats} />
				</div>
			</Block>
			<div className={styles.stats}>
				<Block className={styles.block}>
					<div className={styles.progress}>
						<InterviewQuestionHeader
							title="Статистика пройденных вопросов по всем категориям"
							centered
						/>
						<PassedQuestionChart total={allCount} learned={passedCount} />
					</div>
				</Block>
				<PassedQuestionStatInfo stats={questionStats} />
			</div>
			<Block className={styles.passed}>
				<div className={styles['passed-list']}>
					<InterviewQuestionHeader title="Список пройденных вопросов собеседования" centered />
					<PassedQuestionsList questions={questions} />
				</div>
			</Block>
		</div>
	);
};

export default InterviewQuizResultPage;
