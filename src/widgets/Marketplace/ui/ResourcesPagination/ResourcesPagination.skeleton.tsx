import { Flex } from '@/shared/ui/Flex';
import { PaginationSkeleton } from '@/shared/ui/Pagination';

import styles from './ResourcesPagination.module.css';

export const ResourcesPaginationSkeleton = () => {
	return (
		<Flex justify="center" className={styles.wrapper}>
			<PaginationSkeleton />
		</Flex>
	);
};
