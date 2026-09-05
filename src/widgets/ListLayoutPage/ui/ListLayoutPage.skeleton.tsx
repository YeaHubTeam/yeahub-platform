import { ReactNode } from 'react';

import { useScreenSize } from '@/shared/libs';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { CardSkeleton } from '@/shared/ui/Card';
import { FiltersDrawerSkeleton } from '@/shared/ui/FiltersDrawer';
import { Flex } from '@/shared/ui/Flex';
import { TablePaginationSkeleton } from '@/shared/ui/TablePagination';
import { TextSkeleton } from '@/shared/ui/Text';
import type { TextVariant } from '@/shared/ui/Text';

import styles from './ListLayoutPage.module.css';

interface ListLayoutPageSkeletonProps {
	filters: ReactNode;
	variant?: TextVariant;
	mobilVariant?: TextVariant;
	widthText: number;
	list: ReactNode;
	isEmailVerified?: boolean;
}

export const ListLayoutPageSkeleton = ({
	filters,
	variant = 'body6',
	mobilVariant = 'body5-accent',
	isEmailVerified = false,
	widthText,
	list,
}: ListLayoutPageSkeletonProps) => {
	const { isSmallScreen, isMobileS } = useScreenSize();

	return (
		<Flex className={styles.layout} gap="20" align="start">
			<CardSkeleton className={styles.main}>
				<Flex className={styles.header} direction="row" justify="between">
					<Flex className={styles['title-block']} direction="row" justify="between" align="center">
						<TextSkeleton variant={isMobileS ? mobilVariant : variant} width={widthText} />
						{isEmailVerified && <ButtonSkeleton width={152} />}
					</Flex>
					{isSmallScreen && <FiltersDrawerSkeleton />}
				</Flex>
				<>
					{list}
					<TablePaginationSkeleton />
				</>
			</CardSkeleton>
			{isEmailVerified && <ButtonSkeleton className={styles['absolute-button']} width={153} />}
			<Flex direction="column" gap="20" className={styles['filters-container']}>
				<CardSkeleton className={styles.filters}>{filters}</CardSkeleton>
			</Flex>
		</Flex>
	);
};
