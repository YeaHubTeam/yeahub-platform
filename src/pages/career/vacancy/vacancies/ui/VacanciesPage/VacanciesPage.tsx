import { useTranslation } from 'react-i18next';

import { i18Namespace, Vacancies } from '@/shared/config';
import { useAppSelector, useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { FiltersDrawer } from '@/shared/ui/FiltersDrawer';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { getSpecializationId } from '@/entities/profile';
import { useGetVacanciesListQuery } from '@/entities/vacancy';

import { useVacanciesFilters, VacanciesFilters } from '@/features/vacancy/filterVacancies';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { VacanciesList } from '@/widgets/vacancy/VacanciesList';

import styles from './VacanciesPage.module.css';
import { VacanciesPageSkeleton } from './VacanciesPage.skeleton';

const VacanciesPage = () => {
	const { isSmallScreen, isLargeScreen } = useScreenSize();
	const { t } = useTranslation(i18Namespace.vacancies);
	const specializationId = useAppSelector(getSpecializationId);

	const {
		filters,
		hasFilters,
		onChangePage,
		onChangeEnglishLevel,
		onChangeSkillId,
		onChangeSearch,
		onChangeEmploymentForm,
		onChangeGrade,
		onChangeIndustry,
		onChangeSalaryBucket,
		onChangeWorkFormat,
		onResetFilters,
		onChangeCompanyType,
	} = useVacanciesFilters({ page: 1 });

	const {
		data: vacancies,
		isLoading,
		refetch,
	} = useGetVacanciesListQuery({
		specializationId,
		...filters,
	});

	const renderFilters = () => (
		<VacanciesFilters
			filters={filters}
			onChangeSearch={onChangeSearch}
			onChangeSkillId={onChangeSkillId}
			onChangeCompanyType={onChangeCompanyType}
			onChangeIndustry={onChangeIndustry}
			onChangeGrade={onChangeGrade}
			onChangeEmploymentForm={onChangeEmploymentForm}
			onChangeSalaryBucket={onChangeSalaryBucket}
			onChangeEnglishLevel={onChangeEnglishLevel}
			onChangeWorkFormat={onChangeWorkFormat}
		/>
	);

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(Vacancies.STUB_EMPTY_VACANCIES_TITLE),
			subtitle: t(Vacancies.STUB_EMPTY_VACANCIES_SUBTITLE),
		},
		'filter-empty': {
			onClick: onResetFilters,
		},
		error: {
			onClick: refetch,
		},
	};

	return (
		<PageWrapper
			isLoading={isLoading}
			skeleton={<VacanciesPageSkeleton />}
			hasData={(vacancies?.data || []).length > 0}
			stubs={stubs}
			hasFilters={hasFilters}
			content={<VacanciesList vacancies={vacancies?.data || []} />}
			paginationOptions={{
				page: filters.page || 1,
				onChangePage,
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
								{isSmallScreen && <FiltersDrawer>{renderFilters()}</FiltersDrawer>}
							</Flex>
							<>
								{content}
								{pagination}
							</>
						</Card>
					</div>
					<Flex direction="column" gap="20">
						{isLargeScreen && <Card className={styles.filters}>{renderFilters()}</Card>}
					</Flex>
				</section>
			)}
		</PageWrapper>
	);
};

export default VacanciesPage;
