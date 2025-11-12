import { Response } from '@/shared/types/types';
import { Pagination } from '@/shared/ui/Pagination';

import { Specialization } from '@/entities/specialization';

import styles from './SpecializationPagePagination.module.css';

interface SpecializationsPagePaginationProps {
	specializations?: Response<Specialization[]>;
	currentPage: number;
	onPageChange: (page: number) => void;
}

export const SpecializationsPagePagination = ({
	specializations,
	currentPage,
	onPageChange,
}: SpecializationsPagePaginationProps) => {
	const onPrevPageClick = () => {
		onPageChange(currentPage - 1);
	};

	const onNextPageClick = () => {
		onPageChange(currentPage + 1);
	};

	const onPaginationButtonClick = (newPage: number) => {
		onPageChange(newPage);
	};

	if (!specializations?.data) {
		return null;
	}

	return (
		<div className={styles.wrapper}>
			<Pagination
				onPrevPageClick={onPrevPageClick}
				onNextPageClick={onNextPageClick}
				onChangePage={onPaginationButtonClick}
				page={currentPage}
				totalPages={Math.ceil(specializations?.total / specializations?.limit)}
			/>
		</div>
	);
};
