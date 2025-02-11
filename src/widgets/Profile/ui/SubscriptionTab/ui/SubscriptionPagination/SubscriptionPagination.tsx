import { Pagination } from '@/shared/ui/Pagination';

import styles from './SubscriptionPagination.module.css';

interface SubscriptionPaginationProps {
	// subscribeResponse?: Response<unknown>;
	currentPage: number;
	onPageChange: (page: number) => void;
}

export const SubscriptionPagination = ({
	// subscribeResponse,
	currentPage = 1,
	onPageChange,
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

	// if (!subscribeResponse?.data) {
	//   return null;
	// }

	return (
		<div className={styles.wrapper}>
			<Pagination
				onPrevPageClick={onPrevPageClick}
				onNextPageClick={onNextPageClick}
				onChangePage={onPaginationButtonClick}
				page={currentPage}
				// totalPages={Math.ceil(subscribeResponse?.total / subscribeResponse?.limit)}
				totalPages={24}
			/>
		</div>
	);
};
