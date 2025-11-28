import { PaginationSkeleton } from '@/shared/ui/Pagination';

import styles from './TablePagination.module.css';

export const TablePaginationSkeleton = () => {
	return (
		<div className={styles.wrapper}>
			<PaginationSkeleton />
		</div>
	);
};
