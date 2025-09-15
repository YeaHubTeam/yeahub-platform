import { Response } from '@/shared/types/types';
import { Pagination } from '@/shared/ui/Pagination';

import { ExternalProduct } from '@/entities/external-product';

import styles from './ExternalProductsTablePagePagination.module.css';

interface ExternalProductsPagePaginationProps {
	externalProductsResponse?: Response<ExternalProduct[]>;
	currentPage: number;
	onPageChange: (page: number) => void;
}

export const ExternalProductsTablePagePagination = ({
	externalProductsResponse,
	currentPage,
	onPageChange,
}: ExternalProductsPagePaginationProps) => {
	const onPrevPageClick = () => {
		onPageChange(currentPage - 1);
	};

	const onNextPageClick = () => {
		onPageChange(currentPage + 1);
	};

	const onPaginationButtonClick = (newPage: number) => {
		onPageChange(newPage);
	};

	if (!externalProductsResponse?.data) {
		return null;
	}

	return (
		<div className={styles.wrapper}>
			<Pagination
				onPrevPageClick={onPrevPageClick}
				onNextPageClick={onNextPageClick}
				onChangePage={onPaginationButtonClick}
				page={currentPage}
				totalPages={Math.ceil(externalProductsResponse?.total / externalProductsResponse?.limit)}
			/>
		</div>
	);
};
