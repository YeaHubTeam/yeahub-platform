import { Response } from '@/shared/types/types';
import { Pagination } from '@/shared/ui/Pagination';

import { ResourceRequest } from '@/entities/resource';

import styles from './ResourcesRequestsTabPagination.module.css';

interface ResourcesRequestsTabPaginationProps {
	resourcesRequestsResponse?: Response<ResourceRequest[]>;
	currentPage: number;
	onPageChange: (page: number) => void;
}

export const ResourcesRequestsTabPagination = ({
	resourcesRequestsResponse,
	currentPage,
	onPageChange,
}: ResourcesRequestsTabPaginationProps) => {
	const onPrevPageClick = () => {
		onPageChange(currentPage - 1);
	};

	const onNextPageClick = () => {
		onPageChange(currentPage + 1);
	};

	const onPaginationButtonClick = (newPage: number) => {
		onPageChange(newPage);
	};

	if (!resourcesRequestsResponse?.data) {
		return null;
	}

	return (
		<div className={styles.wrapper}>
			<Pagination
				onPrevPageClick={onPrevPageClick}
				onNextPageClick={onNextPageClick}
				onChangePage={onPaginationButtonClick}
				page={currentPage}
				totalPages={Math.ceil(resourcesRequestsResponse?.total / resourcesRequestsResponse?.limit)}
			/>
		</div>
	);
};
