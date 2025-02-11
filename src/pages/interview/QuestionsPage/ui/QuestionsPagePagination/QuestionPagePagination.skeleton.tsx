import { Flex } from '@/shared/ui/Flex';
import { PaginationSkeleton } from '@/shared/ui/Pagination';

import styles from './QuestionPagePagination.module.css';

export const QuestionPagePaginationSkeleton = () => {
	return (
		<Flex justify="center" className={styles.wrapper}>
			<PaginationSkeleton />
		</Flex>
	);
};
