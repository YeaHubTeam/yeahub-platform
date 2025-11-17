import { Pagination } from '@/shared/ui/Pagination';

import styles from './TablePagination.module.css';

interface TablePaginationProps {
	page: number;
	total: number;
	limit?: number;
	onChangePage: (page: number) => void;
}

export const TablePagination = ({
	page,
	total,
	limit = 10,
	onChangePage,
}: TablePaginationProps) => {
	const onPrevPageClick = () => {
		onChangePage(page - 1);
	};

	const onNextPageClick = () => {
		onChangePage(page + 1);
	};

	const onPaginationButtonClick = (newPage: number) => {
		onChangePage(newPage);
	};

	if (!total || total <= limit) {
		return null;
	}

	return (
		<div className={styles.wrapper}>
			<Pagination
				onPrevPageClick={onPrevPageClick}
				onNextPageClick={onNextPageClick}
				onChangePage={onPaginationButtonClick}
				page={page}
				totalPages={Math.ceil(total / limit)}
			/>
		</div>
	);
};
