import { Flex } from '@/shared/ui/Flex';

import { InterviewPreparationSkeleton } from '@/widgets/interview/InterviewPreparation';
import { PreviewPassedQuizzesListSkeleton } from '@/widgets/interview/PassedQuizzesList';
import { PreviewQuestionsStatisticsSkeleton } from '@/widgets/interview/QuestionsStatistic';
import { PreviewQuestionsListSkeleton } from '@/widgets/question/QuestionsList';

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
