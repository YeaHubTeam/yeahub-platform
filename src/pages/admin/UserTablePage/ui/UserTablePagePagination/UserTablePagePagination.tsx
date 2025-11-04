import { Response } from '@/shared/types/types';
import { Pagination } from '@/shared/ui/Pagination';

import { User } from '@/entities/user';

import styles from './UserTablePagePagination.module.css';

interface UserTablePagePaginationProps {
	users?: Response<User[]>;
	currentPage: number;
	onPageChange: (page: number) => void;
}

export const UserTablePagePagination = ({
	users,
	currentPage,
	onPageChange,
}: UserTablePagePaginationProps) => {
	const onPrevPageClick = () => {
		onPageChange(currentPage - 1);
	};

	const onNextPageClick = () => {
		onPageChange(currentPage + 1);
	};

	const onPaginationButtonClick = (newPage: number) => {
		onPageChange(newPage);
	};

	if (!users?.data) {
		return null;
	}

	return (
		<div className={styles.wrapper}>
			<Pagination
				onPrevPageClick={onPrevPageClick}
				onNextPageClick={onNextPageClick}
				onChangePage={onPaginationButtonClick}
				page={currentPage}
				totalPages={Math.ceil(users?.total / users?.limit)}
			/>
		</div>
	);
};
