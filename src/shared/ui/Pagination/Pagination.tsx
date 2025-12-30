import classNames from 'classnames';

import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { Text } from '@/shared/ui/Text';

import styles from './Pagination.module.css';

const getArrayFromTwoNumbers = (num1: number, num2: number) =>
	Array.from({ length: num2 - num1 + 1 }, (_, i) => num1 + i);

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
		<Flex gap="10" align="center">
			<IconButton
				disabled={page === 1}
				size="small"
				onClick={onPrevPageClick}
				aria-label="back button"
				form="round"
				variant="outline"
				className={styles['arrow-button']}
				icon={<Icon icon="arrowLeft" size={20} color="purple-700" />}
			/>
			{startPage > 1 && (
				<>
					<button
						onClick={handleChangePage(1)}
						className={classNames(styles['page-button'], {
							[styles['page-button-active']]: 1 === page,
						})}
					>
						<Text variant="body2-accent" color={1 === page ? 'white-900' : 'black-700'}>
							1
						</Text>
					</button>
					<Icon
						icon="dotsThree"
						dataTestId="dots-icon"
						className={styles['dots-icon']}
						size={32}
						color="black-700"
					/>
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
						<Text variant="body2-accent" color={value === page ? 'white-900' : 'black-700'}>
							{value}
						</Text>
					</button>
				) : null,
			)}

			{endPage < totalPages && (
				<>
					<Icon
						dataTestId="dots-icon"
						icon="dotsThree"
						className={styles['dots-icon']}
						size={32}
						color="black-700"
					/>
					<button
						onClick={handleChangePage(totalPages)}
						className={classNames(styles['page-button'], {
							[styles['page-button-active']]: totalPages === page,
						})}
					>
						<Text variant="body2-accent" color={totalPages === page ? 'white-900' : 'black-700'}>
							{totalPages}
						</Text>
					</button>
				</>
			)}

			<IconButton
				disabled={page === totalPages}
				size="small"
				onClick={onNextPageClick}
				aria-label="forward button"
				form="round"
				variant="outline"
				className={styles['arrow-button']}
				icon={<Icon icon="arrowRight" size={20} color="purple-700" />}
			/>
		</Flex>
	);
};
