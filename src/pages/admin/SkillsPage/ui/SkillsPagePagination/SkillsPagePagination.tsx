import { Response } from '@/shared/types/types';
import { Pagination } from '@/shared/ui/Pagination';

import { Skill } from '@/entities/skill';

import styles from './SkillsPagePagination.module.css';

interface SkillsPagePaginationProps {
	skills?: Response<Skill[]>;
	currentPage: number;
	onPageChange: (page: number) => void;
}

export const SkillsPagePagination = ({
	skills,
	currentPage,
	onPageChange,
}: SkillsPagePaginationProps) => {
	const onPrevPageClick = () => {
		onPageChange(currentPage - 1);
	};

	const onNextPageClick = () => {
		onPageChange(currentPage + 1);
	};

	const onPaginationButtonClick = (newPage: number) => {
		onPageChange(newPage);
	};

	if (!skills?.data) {
		return null;
	}

	return (
		<div className={styles.wrapper}>
			<Pagination
				onPrevPageClick={onPrevPageClick}
				onNextPageClick={onNextPageClick}
				onChangePage={onPaginationButtonClick}
				page={currentPage}
				totalPages={Math.ceil(skills?.total / skills?.limit)}
			/>
		</div>
	);
};
