import { Pagination } from '@/shared/ui/Pagination';

import styles from './SubscriptionPagination.module.css';

interface SubscriptionPaginationProps {
	currentPage: number;
	onPageChange: (page: number) => void;
	totalPage?: number;
	limitCount?: number;
}

export const SubscriptionPagination = ({
	currentPage = 1,
	onPageChange,
	totalPage,
	limitCount,
}: SubscriptionPaginationProps) => {
	const onPrevPageClick = () => {
		onPageChange(currentPage - 1);
	};

	const onNextPageClick = () => {
		onPageChange(currentPage + 1);
	};

	const onPaginationButtonClick = (newPage: number) => {
		onPageChange(newPage);
	};

	return (
		<div className={styles.wrapper}>
			<Pagination
				onPrevPageClick={onPrevPageClick}
				onNextPageClick={onNextPageClick}
				onChangePage={onPaginationButtonClick}
				page={currentPage}
				totalPages={Math.ceil(totalPage! / limitCount!)}
			/>
		</div>
	);
};
