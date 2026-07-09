'use client';

import { Flex } from '@/shared/ui/Flex';
import { TablePaginationSkeleton } from '@/shared/ui/TablePagination';

import { VacanciesListSkeleton } from '@/widgets/vacancy';

import { VacanciesPageHeaderSkeleton } from '../VacanciesPageHeader/VacanciesPageHeader.skeleton';

import styles from './VacanciesPage.module.css';

export const VacanciesPageSkeleton = () => {
	return (
		<Flex gap="20" align="start">
			<Flex gap="20" direction="column" className={styles.main}>
				<VacanciesPageHeaderSkeleton />
				<VacanciesListSkeleton />
				<TablePaginationSkeleton />
			</Flex>
			<Flex className={styles.filters}></Flex>
		</Flex>
	);
};
