import { useSelector } from 'react-redux';

import { useAppDispatch, useQueryParams } from '@/shared/hooks';
import { Response } from '@/shared/types/types';
import { Pagination } from '@/shared/ui/Pagination';

import { Skill } from '@/entities/skill';

import { getSkillsPageNum } from '../../model/selectors/skillsPageSelectors';
import { skillsPageActions } from '../../model/slices/skillsPageSlice';

import styles from './SkillsPagePagination.module.css';

interface SkillsPagePaginationProps {
	skillsResponse?: Response<Skill[]>;
}

export const SkillsPagePagination = ({ skillsResponse }: SkillsPagePaginationProps) => {
	const dispatch = useAppDispatch();
	const page = useSelector(getSkillsPageNum);

	const { setQueryParams } = useQueryParams();

	const onPrevPageClick = () => {
		dispatch(skillsPageActions.setPage(page - 1));
		setQueryParams({ page: page - 1 });
	};

	const onNextPageClick = () => {
		dispatch(skillsPageActions.setPage(page + 1));
		setQueryParams({ page: page + 1 });
	};

	const onChangePage = (newPage: number) => {
		dispatch(skillsPageActions.setPage(newPage));
		setQueryParams({ page: newPage });
	};

	if (!skillsResponse?.data) {
		return null;
	}

	return (
		<div className={styles.wrapper}>
			<Pagination
				onPrevPageClick={onPrevPageClick}
				onNextPageClick={onNextPageClick}
				onChangePage={onChangePage}
				page={page}
				totalPages={Math.ceil(skillsResponse?.total / skillsResponse?.limit)}
			/>
		</div>
	);
};
