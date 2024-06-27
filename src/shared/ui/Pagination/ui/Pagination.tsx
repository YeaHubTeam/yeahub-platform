import classNames from 'classnames';
import { Icon, IconButton } from 'yeahub-ui-kit';

import styles from './Pagination.module.css';

interface PaginationProps {
	/**
	 * Function for changing the page to the previous one
	 */
	onPrevPageClick: () => void;
	/**
	 * Function for changing the page to the next one
	 */
	onNextPageClick: () => void;
	/**
	 * Function for changing the page
	 */
	onChangePage: (page: number) => void;
	/**
	 * Active page
	 */
	page: number;
	/**
	 * Total number of pages
	 */
	totalPages: number;
}

/**
 * Component that provides navigation through pages in a data table
 * @param onPrevPageClick
 * @param onNextPageClick
 * @param onChangePage
 * @param page
 * @param totalPages
 * @constructor
 */
export const Pagination = ({
	onPrevPageClick,
	onNextPageClick,
	onChangePage,
	page,
	totalPages,
}: PaginationProps) => {
	const handleChangePage = (newPage: number) => () => {
		onChangePage(newPage);
	};

	return (
		<div className={styles.wrapper}>
			<IconButton
				disabled={page === 1}
				size="small"
				onClick={onPrevPageClick}
				aria-label="back button"
				form="round"
				theme="outline"
				icon={<Icon icon="arrowLeft" size={20} />}
			/>
			{Array.from({ length: totalPages }).map((_, index) => (
				<button
					onClick={handleChangePage(index + 1)}
					className={classNames(styles['page-button'], { [styles.active]: index + 1 === page })}
					key={index + 1}
				>
					{index + 1}
				</button>
			))}
			<IconButton
				disabled={page === totalPages}
				size="small"
				onClick={onNextPageClick}
				aria-label="forward button"
				form="round"
				theme="outline"
				icon={<Icon icon="arrowRight" size={20} />}
			/>
		</div>
	);
};
