import { Response } from '@/shared/types/types';
import { Flex } from '@/shared/ui/Flex';
import { Pagination } from '@/shared/ui/Pagination';

import { Question } from '@/entities/question';

import styles from './PublicQuestionPagePagination.module.css';

interface QuestionPagePaginationProps {
	questionsResponse?: Response<Question[]>;
	currentPage: number;
	onPageChange: (page: number) => void;
}

export const PublicQuestionPagePagination = ({
	questionsResponse,
	currentPage,
	onPageChange,
}: QuestionPagePaginationProps) => {
	const onPrevPageClick = () => {
		onPageChange(currentPage - 1);
	};

	const onNextPageClick = () => {
		onPageChange(currentPage + 1);
	};

	const onPaginationButtonClick = (newPage: number) => {
		onPageChange(newPage);
	};

	if (!questionsResponse?.data) {
		return null;
	}

	return (
		<Flex justify="center" className={styles.wrapper}>
			<Pagination
				onPrevPageClick={onPrevPageClick}
				onNextPageClick={onNextPageClick}
				onChangePage={onPaginationButtonClick}
				page={currentPage}
				totalPages={Math.ceil(questionsResponse?.total / questionsResponse?.limit)}
			/>
		</Flex>
	);
};
