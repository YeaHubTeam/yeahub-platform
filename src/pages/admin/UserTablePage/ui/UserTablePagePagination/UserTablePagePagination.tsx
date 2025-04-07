import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks';
import { useQueryParams } from '@/shared/hooks/useQueryParams';
import { Response } from '@/shared/types/types';
import { Pagination } from '@/shared/ui/Pagination';

import { User } from '@/entities/user';

import { getUsersPageNum } from '../../model/selectors/usersPageSelectors';
import { usersPageActions } from '../../model/slices/usersPageSlice';

import styles from './UserTablePagePagination.module.css';

interface UsersPagePaginationProps {
	usersResponse?: Response<User[]>;
}

export const UserTablePagePagination = ({ usersResponse }: UsersPagePaginationProps) => {
	const dispatch = useAppDispatch();
	const page = useSelector(getUsersPageNum);

	const { setQueryParams } = useQueryParams();

	const onPrevPageClick = () => {
		dispatch(usersPageActions.setPage(page - 1));
		setQueryParams({ page: page - 1 });
	};

	const onNextPageClick = () => {
		dispatch(usersPageActions.setPage(page + 1));
		setQueryParams({ page: page + 1 });
	};

	const onChangePage = (newPage: number) => {
		dispatch(usersPageActions.setPage(newPage));
		setQueryParams({ page: newPage });
	};

	if (!usersResponse?.data) {
		return null;
	}

	return (
		<div className={styles.wrapper}>
			<Pagination
				onPrevPageClick={onPrevPageClick}
				onNextPageClick={onNextPageClick}
				onChangePage={onChangePage}
				page={page}
				totalPages={Math.ceil(usersResponse?.total / usersResponse?.limit)}
			/>
		</div>
	);
};

export default UserTablePagePagination;
