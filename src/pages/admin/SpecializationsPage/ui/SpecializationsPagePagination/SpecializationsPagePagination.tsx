import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks';
import { useQueryParams } from '@/shared/hooks/useQueryParams';
import { Response } from '@/shared/types/types';
import { Pagination } from '@/shared/ui/Pagination';

import { Specialization } from '@/entities/specialization';

import { getSpecializationsPageNum } from '../../model/selectors/specializationsPageSelectors';
import { specializationsPageActions } from '../../model/slices/specializationsPageSlice';

import styles from './SpecializationPagePagination.module.css';
interface SpecializationsPagePaginationProps {
	specializationsResponse?: Response<Specialization[]>;
}

export const SpecializationsPagePagination = ({
	specializationsResponse,
}: SpecializationsPagePaginationProps) => {
	const dispatch = useAppDispatch();
	const page = useSelector(getSpecializationsPageNum);

	const { setQueryParams } = useQueryParams();

	const onPrevPageClick = () => {
		dispatch(specializationsPageActions.setPage(page - 1));
		setQueryParams({ page: page - 1 });
	};

	const onNextPageClick = () => {
		dispatch(specializationsPageActions.setPage(page + 1));
		setQueryParams({ page: page + 1 });
	};

	const onChangePage = (newPage: number) => {
		dispatch(specializationsPageActions.setPage(newPage));
		setQueryParams({ page: newPage });
	};

	if (!specializationsResponse?.data) {
		return null;
	}

	return (
		<div className={styles.wrapper}>
			<Pagination
				onPrevPageClick={onPrevPageClick}
				onNextPageClick={onNextPageClick}
				onChangePage={onChangePage}
				page={page}
				totalPages={Math.ceil(specializationsResponse.total / specializationsResponse.limit)}
			/>
		</div>
	);
};
