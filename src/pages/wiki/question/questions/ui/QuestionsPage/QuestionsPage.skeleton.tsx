import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { FiltersDrawerSkeleton } from '@/shared/ui/FiltersDrawer';
import { Flex } from '@/shared/ui/Flex';
import { TablePaginationSkeleton } from '@/shared/ui/TablePagination';
import { TextSkeleton } from '@/shared/ui/Text';

import { QuestionsFiltersSkeleton } from '@/features/question/filterQuestions';

import { FullQuestionsListSkeleton } from '@/widgets/question/QuestionsList';

import styles from './QuestionsPage.module.css';

export const QuestionsPageSkeleton = () => {
	const { isSmallScreen, isMobileS } = useScreenSize();

	return (
		<Flex gap="20" align="start">
			<Card className={styles.main}>
				<div className={styles['questions-list-header']}>
					<TextSkeleton variant={isMobileS ? 'body5-accent' : 'body6'} width={150} />
					{isSmallScreen && <FiltersDrawerSkeleton />}
				</div>
				<hr className={styles.divider} />
				<FullQuestionsListSkeleton />
				<TablePaginationSkeleton />
			</Card>
			<Card className={styles.filters}>
				<QuestionsFiltersSkeleton />
			</Card>
		</Flex>
	);
};
