import { Flex } from '@/shared/ui/Flex';

import { CategoryProgressListSkeleton } from '@/widgets/interview/CategoryProgressList';
import { PreviewPassedQuizzesListSkeleton } from '@/widgets/interview/PassedQuizzesList';
import { FullQuestionsStatisticSkeleton } from '@/widgets/interview/QuestionsStatistic';
import { QuizzesStatisticSkeleton } from '@/widgets/interview/QuizzesStatistic';

import styles from './InterviewStatisticsPage.module.css';

export const InterviewStatisticsPageSkeleton = () => {
	return (
		<Flex wrap="wrap" gap="20" className={styles.container}>
			<QuizzesStatisticSkeleton className={styles.quizzes} />
			<FullQuestionsStatisticSkeleton className={styles.questions} />
			<PreviewPassedQuizzesListSkeleton className={styles.history} />
			<CategoryProgressListSkeleton className={styles.progress} />
		</Flex>
	);
};
