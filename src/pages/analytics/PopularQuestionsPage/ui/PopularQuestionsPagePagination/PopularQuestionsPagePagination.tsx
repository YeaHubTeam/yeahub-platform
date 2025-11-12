import { Pagination } from '@/shared/ui/Pagination';

import { PopularQuestionStat } from '@/entities/question';

import styles from './PopularQuestionsPagePagination.module.css';

interface PopularQuestionsPagePaginationProps {
	popularQuestions?: PopularQuestionStat[];
	currentPage: number;
	onChangePage: (page: number) => void;
	limit: number;
}

export const PopularQuestionsPagePagination = ({
	popularQuestions,
	currentPage,
	onChangePage,
	limit,
}: PopularQuestionsPagePaginationProps) => {
	const onPrevPageClick = () => {
		onChangePage(currentPage - 1);
	};

	const onNextPageClick = () => {
		onChangePage(currentPage + 1);
	};

	const onPaginationButtonClick = (newPage: number) => {
		onChangePage(newPage);
	};

	if (!popularQuestions?.length) {
		return null;
	}

	return (
		<div className={styles.wrapper}>
			<Pagination
				onPrevPageClick={onPrevPageClick}
				onNextPageClick={onNextPageClick}
				onChangePage={onPaginationButtonClick}
				page={currentPage}
				totalPages={Math.ceil(popularQuestions.length / limit)}
			/>
		</div>
	);
};
