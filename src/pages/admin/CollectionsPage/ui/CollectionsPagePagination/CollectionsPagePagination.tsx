import { Response } from '@/shared/types/types';
import { Pagination } from '@/shared/ui/Pagination';

import { Collection } from '@/entities/collection';

import styles from './CollectionsPagePagination.module.css';

interface CollectionsPagePaginationProps {
	collectionsResponse?: Response<Collection[]>;
	currentPage: number;
	onPageChange: (page: number) => void;
}

export const CollectionsPagePagination = ({
	collectionsResponse,
	currentPage,
	onPageChange,
}: CollectionsPagePaginationProps) => {
	const onPrevPageClick = () => {
		onPageChange(currentPage - 1);
	};

	const onNextPageClick = () => {
		onPageChange(currentPage + 1);
	};

	const onPaginationButtonClick = (newPage: number) => {
		onPageChange(newPage);
	};

	if (!collectionsResponse?.data) {
		return null;
	}

	return (
		<div className={styles.wrapper}>
			<Pagination
				onPrevPageClick={onPrevPageClick}
				onNextPageClick={onNextPageClick}
				onChangePage={onPaginationButtonClick}
				page={currentPage}
				totalPages={Math.ceil(collectionsResponse?.total / collectionsResponse?.limit)}
			/>
		</div>
	);
};
