import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TablePaginationSkeleton } from '@/shared/ui/TablePagination';

import { QuestionsFiltersSkeleton } from '@/features/question/filterQuestions';

import { FullQuestionsListSkeleton } from '@/widgets/question/QuestionsList';

import styles from './PublicQuestionsPage.module.css';

export const PublicQuestionsPageSkeleton = ({ dataTestId }: { dataTestId?: string }) => {
	return (
		<Flex dataTestId={dataTestId} gap="20" align="start">
			<Card className={styles.main}>
				<FullQuestionsListSkeleton />
				<TablePaginationSkeleton />
			</Card>
			<Card className={styles.filters}>
				<QuestionsFiltersSkeleton />
			</Card>
		</Flex>
	);
};
