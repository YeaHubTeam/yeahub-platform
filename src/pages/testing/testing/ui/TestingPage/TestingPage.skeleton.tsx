import { Flex } from '@/shared/ui/Flex';

import { PreviewTestQuestionsListSkeleton } from '@/widgets/testing/TestQuestionsList';

import styles from './TestingPage.module.css';

export const TestingPageSkeleton = () => {
	return (
		<Flex direction="column" gap="20" className={styles.list}>
			<PreviewTestQuestionsListSkeleton />
		</Flex>
	);
};
