import { Response } from '@/shared/types/types';
import { Pagination } from '@/shared/ui/Pagination';

import { ResourceRequest } from '@/entities/resource';

import styles from './ResourceRequestsPagePagination.module.css';

interface ResourceRequestsPagePaginationProps {
	resourceRequestsResponse?: Response<ResourceRequest[]>;
	currentPage: number;
	onPageChange: (page: number) => void;
}

export const ResourceRequestsPagePagination = ({
	resourceRequestsResponse,
	currentPage,
	onPageChange,
}: ResourceRequestsPagePaginationProps) => {
	const onPrevPageClick = () => {
		onPageChange(currentPage - 1);
	};

	const onNextPageClick = () => {
		onPageChange(currentPage + 1);
	};

	const onPaginationButtonClick = (newPage: number) => {
		onPageChange(newPage);
	};

	if (!resourceRequestsResponse?.data) {
		return null;
	}

	return (
		<div className={styles.wrapper}>
			<Pagination
				onPrevPageClick={onPrevPageClick}
				onNextPageClick={onNextPageClick}
				onChangePage={onPaginationButtonClick}
				page={currentPage}
				totalPages={Math.ceil(resourceRequestsResponse?.total / resourceRequestsResponse?.limit)}
			/>
		</div>
	);
};
