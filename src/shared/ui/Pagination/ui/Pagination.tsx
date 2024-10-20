import classNames from 'classnames';
import { Icon, IconButton } from 'yeahub-ui-kit';

import { getArrayFromTwoNumbers } from '@/shared/helpers/getArrayFromTwoNumbers';

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
	if (totalPages <= 1) return null;

	const handleChangePage = (newPage: number) => () => {
		if (page != newPage) onChangePage(newPage);
	};

	const endPage = Math.min(totalPages, Math.max(1, page - 3) + 5);
	const startPage = Math.max(1, endPage - 5);

	const buttonsValues = getArrayFromTwoNumbers(startPage, endPage);

	return (
		<div className={styles.wrapper}>
			<IconButton
				disabled={page === 1}
				size="small"
				onClick={onPrevPageClick}
				aria-label="back button"
				form="round"
				theme="outline"
				className={styles['arrow-button']}
				icon={<Icon icon="arrowLeft" size={20} />}
			/>
			{startPage > 1 && (
				<>
					<button
						onClick={handleChangePage(1)}
						className={classNames(styles['page-button'], {
							[styles['page-button-active']]: 1 === page,
						})}
					>
						1
					</button>
					<Icon icon="dotsThree" className={styles['dots-icon']} size={32} />
				</>
			)}

			{buttonsValues.map((value) =>
				value ? (
					<button
						onClick={handleChangePage(value)}
						className={classNames(styles['page-button'], {
							[styles['page-button-active']]: value === page,
						})}
						key={value}
					>
						{value}
					</button>
				) : null,
			)}

			{endPage < totalPages && (
				<>
					<Icon icon="dotsThree" className={styles['dots-icon']} size={32} />
					<button
						onClick={handleChangePage(totalPages)}
						className={classNames(styles['page-button'], {
							[styles['page-button-active']]: totalPages === page,
						})}
					>
						{totalPages}
					</button>
				</>
			)}

			<IconButton
				disabled={page === totalPages}
				size="small"
				onClick={onNextPageClick}
				aria-label="forward button"
				form="round"
				theme="outline"
				className={styles['arrow-button']}
				icon={<Icon icon="arrowRight" size={20} />}
			/>
		</div>
	);
};
