import { Response } from '@/shared/types/types';
import { Pagination } from '@/shared/ui/Pagination';

import { Company } from '@/entities/company';

import styles from './CompaniesTablePagePagination.module.css';

interface CompaniesTablePagePaginationProps {
	companiesResponse?: Response<Company[]>;
	currentPage: number;
	onChangePage: (page: number) => void;
}

export const CompaniesTablePagePagination = ({
	companiesResponse,
	currentPage,
	onChangePage,
}: CompaniesTablePagePaginationProps) => {
	const onPrevPageClick = () => {
		onChangePage(currentPage - 1);
	};

	const onNextPageClick = () => {
		onChangePage(currentPage + 1);
	};

	const onPaginationButtonClick = (newPage: number) => {
		onChangePage(newPage);
	};

	if (!companiesResponse?.data || companiesResponse.data.length === 0) {
		return null;
	}

	return (
		<div className={styles.wrapper}>
			<Pagination
				onPrevPageClick={onPrevPageClick}
				onNextPageClick={onNextPageClick}
				onChangePage={onPaginationButtonClick}
				page={currentPage}
				totalPages={Math.ceil(companiesResponse.total / companiesResponse.limit)}
			/>
		</div>
	);
};
