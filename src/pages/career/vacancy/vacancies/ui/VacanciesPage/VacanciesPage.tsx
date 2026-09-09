import { useTranslation } from 'react-i18next';

import { i18Namespace, Vacancies } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';

import { getSpecializationId } from '@/entities/profile';
import { useGetVacanciesListQuery } from '@/entities/vacancy';

import { useVacanciesFilters, VacanciesFilters } from '@/features/vacancy/filterVacancies';

import { ListLayoutPage } from '@/widgets/ListLayoutPage';
import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { VacanciesList } from '@/widgets/vacancy/VacanciesList';

import { VacanciesPageSkeleton } from './VacanciesPage.skeleton';

const VacanciesPage = () => {
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
				<ListLayoutPage
					title={t(Vacancies.LIST_PAGE_TITLE)}
					filters={renderFilters()}
					pagination={pagination}
				>
					{content}
				</ListLayoutPage>
			)}
		</PageWrapper>
	);
};

export default VacanciesPage;
