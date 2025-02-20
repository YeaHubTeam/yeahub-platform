import { Flex } from '@/shared/ui/Flex';

import { PreviewPassedQuizzesListSkeleton } from '@/widgets/interview/PassedQuizzesList';
import { PreviewCollectionsListSkeleton } from '@/widgets/interview/PreviewCollectionsList';
import { PreviewQuestionsListSkeleton } from '@/widgets/interview/QuestionsList';
import { PreviewQuestionsStatisticsSkeleton } from '@/widgets/interview/QuestionsStatistic';
import { InterviewPreparationSkeleton } from '@/widgets/InterviewPreparation';

import styles from './InterviewPage.module.css';

export const InterviewPageSkeleton = () => {
	return (
		<Flex wrap="wrap" justify="between" gap="20">
			<InterviewPreparationSkeleton className={styles.interview} />
			<PreviewQuestionsStatisticsSkeleton className={styles.statistics} />
			<Flex direction="column" gap="20" className={styles.list}>
				<PreviewQuestionsListSkeleton />
				<PreviewPassedQuizzesListSkeleton />
			</Flex>
			<PreviewCollectionsListSkeleton className={styles.collections} />
		</Flex>
	);
};
