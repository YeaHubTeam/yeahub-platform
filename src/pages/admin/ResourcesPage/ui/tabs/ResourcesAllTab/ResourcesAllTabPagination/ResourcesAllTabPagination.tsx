import { Response } from '@/shared/types/types';
import { Pagination } from '@/shared/ui/Pagination';

import { Resource } from '@/entities/resource';

import styles from './ResourcesAllTabPagination.module.css';

interface ResourcesAllTabPaginationProps {
	resourcesResponse?: Response<Resource[]>;
	currentPage: number;
	onPageChange: (page: number) => void;
}

export const ResourcesAllTabPagination = ({
	resourcesResponse,
	currentPage,
	onPageChange,
}: ResourcesAllTabPaginationProps) => {
	const onPrevPageClick = () => {
		onPageChange(currentPage - 1);
	};

	const onNextPageClick = () => {
		onPageChange(currentPage + 1);
	};

	const onPaginationButtonClick = (newPage: number) => {
		onPageChange(newPage);
	};

	if (!resourcesResponse?.data) {
		return null;
	}

	return (
		<div className={styles.wrapper}>
			<Pagination
				onPrevPageClick={onPrevPageClick}
				onNextPageClick={onNextPageClick}
				onChangePage={onPaginationButtonClick}
				page={currentPage}
				totalPages={Math.ceil(resourcesResponse?.total / resourcesResponse?.limit)}
			/>
		</div>
	);
};
