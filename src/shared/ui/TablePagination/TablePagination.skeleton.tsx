import { PaginationSkeleton } from '@/shared/ui/Pagination';

import { tablePaginationTestIds } from './constants';
import styles from './TablePagination.module.css';

export const TablePaginationSkeleton = () => {
	return (
		<div className={styles.wrapper} data-testId={tablePaginationTestIds.tablePaginationSkeleton}>
			<PaginationSkeleton />
		</div>
	);
};
