import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TablePaginationSkeleton } from '@/shared/ui/TablePagination';

import { VacanciesListSkeleton } from '@/widgets/Vacancy';

import { VacanciesFilterPanelSkeleton } from '../VacanciesFilterPanel/VacanciesFilterPanel.skeleton';

import styles from './VacanciesPage.module.css';

export const VacanciesPageSkeleton = () => {
	return (
		<Flex gap="20" align="start">
			<CardSkeleton className={styles.main}>
				<VacanciesListSkeleton />
				<TablePaginationSkeleton />
			</CardSkeleton>
			<CardSkeleton className={styles.filters}>
				<VacanciesFilterPanelSkeleton />
			</CardSkeleton>
		</Flex>
	);
};
