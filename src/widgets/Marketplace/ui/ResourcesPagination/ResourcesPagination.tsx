import { Response } from '@/shared/types/types';
import { Pagination } from '@/shared/ui/Pagination';

import { Resource } from '@/entities/resource';

import styles from './ResourcesPagination.module.css';

interface ResourcesPaginationProps {
	resourcesResponse?: Response<Resource[]>;
	currentPage: number;
	onPageChange: (page: number) => void;
}

export const ResourcesPagination = ({
	resourcesResponse,
	currentPage,
	onPageChange,
}: ResourcesPaginationProps) => {
	if (!resourcesResponse?.data?.length) return null;

	const totalPages = Math.ceil(resourcesResponse.total / resourcesResponse.limit);

	const handlePrev = () => onPageChange(currentPage - 1);
	const handleNext = () => onPageChange(currentPage + 1);
	const handleButton = (page: number) => onPageChange(page);

	return (
		<div className={styles.wrapper}>
			<Pagination
				onPrevPageClick={handlePrev}
				onNextPageClick={handleNext}
				onChangePage={handleButton}
				page={currentPage}
				totalPages={totalPages}
			/>
		</div>
	);
};
