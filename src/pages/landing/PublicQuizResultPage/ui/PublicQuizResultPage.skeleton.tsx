import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Flex } from '@/shared/ui/Flex';

import { CategoryProgressListSkeleton } from '@/widgets/interview/CategoryProgressList';
import { PassedQuestionsListSkeleton } from '@/widgets/interview/PassedQuestionsList';
import { PassedQuestionsStatisticSkeleton } from '@/widgets/interview/QuestionsStatistic';

import styles from './PublicQuizResultPage.module.css';

export const PublicQuizResultPageSkeleton = () => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<Flex gap="20" direction="column" className={styles.container}>
			<Flex gap="20" className={styles.wrapper} direction={isTablet || isMobile ? 'column' : 'row'}>
				<PassedQuestionsStatisticSkeleton className={styles.statistic} total={0} />
				<CategoryProgressListSkeleton className={styles.progress} />
			</Flex>
			<PassedQuestionsListSkeleton className={styles['questions-list']} questions={[]} />
		</Flex>
	);
};
