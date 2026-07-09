import { useSearchParams } from 'react-router-dom';

import { Flex } from '@/shared/ui/Flex';

import { useGetVacanciesListQuery } from '@/entities/vacancy';

import { VacanciesList } from '@/widgets/vacancy';

import { VacanciesPageHeader } from '../VacanciesPageHeader/VacanciesPageHeader';
import { VacanciesPagePagination } from '../VacanciesPagePagination/VacanciesPagePagination';

import styles from './VacanciesPage.module.css';

export const VacanciesPage = () => {
	const [searchParams] = useSearchParams();
	const currentPage = Number(searchParams.get('page')) || 1;
	const { data } = useGetVacanciesListQuery({
		limit: 10,
		page: currentPage,
	});

	return (
		<Flex gap="20" align="start">
			<Flex gap="20" direction="column" className={styles.main}>
				<VacanciesPageHeader />
				<VacanciesList vacancies={data?.data || []} />
				<VacanciesPagePagination
					total={data?.total || 0}
					limit={data?.limit || 0}
					currentPage={currentPage}
				/>
			</Flex>
			<Flex className={styles.filters}></Flex>
		</Flex>
	);
};
