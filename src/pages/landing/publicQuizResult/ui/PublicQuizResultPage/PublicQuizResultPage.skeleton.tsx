import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { CategoryProgressListSkeleton } from '@/widgets/interview/CategoryProgressList';
import { PassedQuestionsListSkeleton } from '@/widgets/interview/PassedQuestionsList';
import { PassedQuestionsStatisticSkeleton } from '@/widgets/interview/QuestionsStatistic';

import styles from './PublicQuizResultPage.module.css';

export const PublicQuizResultPageSkeleton = ({ dataTestId }: { dataTestId?: string }) => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<Flex dataTestId={dataTestId} gap="20" direction="column">
			<Flex gap="20" direction={isTablet || isMobile ? 'column' : 'row'}>
				<PassedQuestionsStatisticSkeleton className={styles.statistic} total={0} />
				<CategoryProgressListSkeleton className={styles.progress} />
			</Flex>
			<PassedQuestionsListSkeleton className={styles['questions-list']} questions={[]} />
		</Flex>
	);
};
