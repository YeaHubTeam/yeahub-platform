import { Flex } from '@/shared/ui/Flex';

import { PreviewPassedQuizzesListSkeleton } from '@/widgets/interview/PassedQuizzesList';
import { PreviewQuestionsListSkeleton } from '@/widgets/interview/QuestionsList';
import { PreviewQuestionsStatisticsSkeleton } from '@/widgets/interview/QuestionsStatistic';
import { InterviewPreparationSkeleton } from '@/widgets/InterviewPreparation';

import styles from './InterviewPage.module.css';

export const InterviewPageSkeleton = () => {
	return (
		<Flex wrap="wrap" justify="between" gap="20">
			<InterviewPreparationSkeleton className={styles.interview} />
			<PreviewQuestionsStatisticsSkeleton className={styles.statistics} />
			<PreviewQuestionsListSkeleton className={styles.questions} />
			<PreviewPassedQuizzesListSkeleton className={styles.history} />
		</Flex>
	);
};
