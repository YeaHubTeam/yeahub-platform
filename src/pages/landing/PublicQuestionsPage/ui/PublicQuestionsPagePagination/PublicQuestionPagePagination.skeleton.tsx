import { Flex } from '@/shared/ui/Flex';
import { PaginationSkeleton } from '@/shared/ui/Pagination';

import styles from './PublicQuestionPagePagination.module.css';

export const PublicQuestionPagePaginationSkeleton = () => {
	return (
		<Flex justify="center" className={styles.wrapper}>
			<PaginationSkeleton />
		</Flex>
	);
};
