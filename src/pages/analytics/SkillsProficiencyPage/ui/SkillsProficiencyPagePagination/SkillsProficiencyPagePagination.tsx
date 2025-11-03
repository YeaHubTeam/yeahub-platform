import { Pagination } from '@/shared/ui/Pagination';

import { GetLearnedQuestionsResponse } from '@/entities/question';

import styles from './SkillsProficiencyPagePagination.module.css';

interface SkillsProficiencyPagePaginationProps {
	learnedQuestionsResponse?: GetLearnedQuestionsResponse;
	currentPage: number;
	onChangePage: (page: number) => void;
}

export const SkillsProficiencyPagePagination = ({
	learnedQuestionsResponse,
	currentPage,
	onChangePage,
}: SkillsProficiencyPagePaginationProps) => {
	const onPrevPageClick = () => {
		onChangePage(currentPage - 1);
	};

	const onNextPageClick = () => {
		onChangePage(currentPage + 1);
	};

	const onPaginationButtonClick = (newPage: number) => {
		onChangePage(newPage);
	};

	if (!learnedQuestionsResponse?.data || !learnedQuestionsResponse.data.length) {
		return null;
	}

	return (
		<div className={styles.wrapper}>
			<Pagination
				onPrevPageClick={onPrevPageClick}
				onNextPageClick={onNextPageClick}
				onChangePage={onPaginationButtonClick}
				page={currentPage}
				totalPages={Math.ceil(learnedQuestionsResponse.total / learnedQuestionsResponse.limit)}
			/>
		</div>
	);
};
