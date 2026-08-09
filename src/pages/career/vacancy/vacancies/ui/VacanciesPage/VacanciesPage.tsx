import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { i18Namespace, Vacancies } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { FiltersDrawer } from '@/shared/ui/FiltersDrawer';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { useGetVacanciesListQuery } from '@/entities/vacancy';

import { PageWrapper } from '@/widgets/PageWrapper';
import { VacanciesList } from '@/widgets/vacancy';

import styles from './VacanciesPage.module.css';
import { VacanciesPageSkeleton } from './VacanciesPage.skeleton';

const VacanciesPage = () => {
	const { isSmallScreen, isLargeScreen } = useScreenSize();
	const { t } = useTranslation(i18Namespace.vacancies);

	const [searchParams] = useSearchParams();
	const currentPage = Number(searchParams.get('page')) || 1;
	const { data: vacancies, isLoading } = useGetVacanciesListQuery({
		page: currentPage,
	});

	return (
		<PageWrapper
			isLoading={isLoading}
			skeleton={<VacanciesPageSkeleton />}
			hasData={(vacancies?.data || []).length > 0}
			stubs={{}}
			content={<VacanciesList vacancies={vacancies?.data || []} />}
			paginationOptions={{
				page: currentPage,
				onChangePage: () => {},
				limit: vacancies?.limit || 0,
				total: vacancies?.total || 0,
			}}
		>
			{({ content, pagination }) => (
				<section className={styles.wrapper}>
					<div className={styles['main-info-wrapper']}>
						<Card className={styles.content}>
							<Flex className={styles.header} direction="row" justify="between">
								<Text variant="body6" isMainTitle maxRows={1}>
									{t(Vacancies.LIST_PAGE_TITLE)}
								</Text>
								{isSmallScreen && <FiltersDrawer>-</FiltersDrawer>}
							</Flex>
							<>
								{content}
								{pagination}
							</>
						</Card>
					</div>
					<Flex direction="column" gap="20">
						{isLargeScreen && <Card className={styles.filters}>-</Card>}
					</Flex>
				</section>
			)}
		</PageWrapper>
	);
};

export default VacanciesPage;
