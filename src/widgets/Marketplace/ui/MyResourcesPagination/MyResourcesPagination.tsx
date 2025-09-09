import { Response } from '@/shared/types/types';
import { Pagination } from '@/shared/ui/Pagination';

import { MyResource } from '@/entities/resource';

import styles from './MyResourcesPagination.module.css';

interface ResourcesPaginationProps {
	resourcesResponse?: Response<MyResource[]>;
	currentPage: number;
	onChangePage: (page: number) => void;
}

export const MyResourcesPagination = ({
	resourcesResponse,
	currentPage,
	onChangePage,
}: ResourcesPaginationProps) => {
	if (!resourcesResponse?.data?.length) return null;

	const totalPages = Math.ceil(resourcesResponse.total / resourcesResponse.limit);

	const handlePrev = () => onChangePage(currentPage - 1);
	const handleNext = () => onChangePage(currentPage + 1);
	const handleButton = (page: number) => onChangePage(page);

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
