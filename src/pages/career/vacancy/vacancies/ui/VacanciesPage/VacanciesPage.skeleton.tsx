import { CardSkeleton } from '@/shared/ui/Card';
import { FiltersDrawerSkeleton } from '@/shared/ui/FiltersDrawer';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { VacanciesListSkeleton } from '@/widgets/vacancy';

import styles from './VacanciesPage.module.css';

export const VacanciesPageSkeleton = () => {
	return (
		<Flex gap="20" align="start" className={styles.wrapper}>
			<div className={styles['main-info-wrapper']}>
				<CardSkeleton className={styles.content}>
					<Flex justify="between" className={styles.header}>
						<TextSkeleton variant="body6" width={124} />
						<FiltersDrawerSkeleton />
					</Flex>
					<VacanciesListSkeleton />
				</CardSkeleton>
			</div>
			<CardSkeleton className={styles.filters}></CardSkeleton>
		</Flex>
	);
};
