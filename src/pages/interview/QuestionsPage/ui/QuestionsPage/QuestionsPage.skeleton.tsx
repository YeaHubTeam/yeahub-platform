import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { QuestionsFiltersSkeleton } from '@/features/question/filterQuestions';

import { FullQuestionsListSkeleton } from '@/widgets/question/QuestionsList';

import { QuestionPagePaginationSkeleton } from '../QuestionsPagePagination/QuestionPagePagination.skeleton';

import styles from './QuestionsPage.module.css';

export const QuestionsPageSkeleton = () => {
	return (
		<Flex gap="20" align="start">
			<Card className={styles.main}>
				<FullQuestionsListSkeleton />
				<QuestionPagePaginationSkeleton />
			</Card>
			<Card className={styles.filters}>
				<QuestionsFiltersSkeleton />
			</Card>
		</Flex>
	);
};
