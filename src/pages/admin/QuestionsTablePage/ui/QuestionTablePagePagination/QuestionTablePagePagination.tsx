import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useQueryParams } from '@/shared/hooks/useQueryParams';
import { Response } from '@/shared/types/types';
import { Pagination } from '@/shared/ui/Pagination';

import { Question } from '@/entities/question';

import { getQuestionsPageNum } from '../../model/selectors/questionsTablePageSelectors';
import { questionsTablePageActions } from '../../model/slices/questionsTablePageSlice';

import styles from './QuestionTablePagePagination.module.css';

interface QuestionPagePaginationProps {
	questionsResponse?: Response<Question[]>;
}

export const QuestionPagePagination = ({ questionsResponse }: QuestionPagePaginationProps) => {
	const dispatch = useAppDispatch();
	const page = useSelector(getQuestionsPageNum);

	const { setQueryParams } = useQueryParams();

	const onPrevPageClick = () => {
		dispatch(questionsTablePageActions.setPage(page - 1));
		setQueryParams({ page: page - 1 });
	};

	const onNextPageClick = () => {
		dispatch(questionsTablePageActions.setPage(page + 1));
		setQueryParams({ page: page + 1 });
	};

	const onChangePage = (newPage: number) => {
		dispatch(questionsTablePageActions.setPage(newPage));
		setQueryParams({ page: newPage });
	};

	if (!questionsResponse?.data) {
		return null;
	}

	return (
		<div className={styles.wrapper}>
			<Pagination
				onPrevPageClick={onPrevPageClick}
				onNextPageClick={onNextPageClick}
				onChangePage={onChangePage}
				page={page}
				totalPages={Math.ceil(questionsResponse?.total / questionsResponse?.limit)}
			/>
		</div>
	);
};
