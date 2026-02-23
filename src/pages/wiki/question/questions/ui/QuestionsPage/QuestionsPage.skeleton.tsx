import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { IconSkeleton } from '@/shared/ui/Icon';
import { TablePaginationSkeleton } from '@/shared/ui/TablePagination';
import { TextSkeleton } from '@/shared/ui/Text';

import { QuestionsFiltersSkeleton } from '@/features/question/filterQuestions';

import { FullQuestionsListSkeleton } from '@/widgets/question/QuestionsList';

import styles from './QuestionsPage.module.css';

export const QuestionsPageSkeleton = () => {
	const { isMobile, isMobileS, isTablet } = useScreenSize();

	return (
		<Flex gap="20" align="start">
			<Card className={styles.main}>
				<div className={styles['questions-list-header']}>
					<TextSkeleton variant={isMobileS ? 'body5-accent' : 'body6'} width={150} />
					{(isMobile || isTablet) && <IconSkeleton size={32} />}
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
