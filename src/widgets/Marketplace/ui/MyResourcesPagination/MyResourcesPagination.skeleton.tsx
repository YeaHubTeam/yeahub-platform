import { Flex } from '@/shared/ui/Flex';
import { PaginationSkeleton } from '@/shared/ui/Pagination';

import styles from './MyResourcesPagination.module.css';

export const MyResourcesPaginationSkeleton = () => {
	return (
		<Flex justify="center" className={styles.wrapper}>
			<PaginationSkeleton />
		</Flex>
	);
};
