import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Companies, i18Namespace, ROUTES } from '@/shared/config';
import { SelectedAdminEntities, useAppDispatch, useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetCompaniesListQuery } from '@/entities/company';
import { getUserId } from '@/entities/profile';

import { DeleteCompaniesButton } from '@/features/company/deleteCompanies';
import { CompaniesFilters, useCompaniesFilters } from '@/features/company/filterCompanies';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { SearchSection } from '@/widgets/SearchSection';

import { getSelectedCompanies } from '../../model/selectors/companiesPageSelectors';
import { companiesPageActions } from '../../model/slices/companiesPageSlice';
import { CompaniesTable } from '../CompaniesTable/CompaniesTable';

import styles from './CompaniesPage.module.css';
import { CompaniesPageSkeleton } from './CompaniesPage.skeleton';

const CompaniesPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { t } = useTranslation(i18Namespace.companies);
	const selectedCompanies = useAppSelector(getSelectedCompanies);
	const userId = useAppSelector(getUserId);

	const {
		filters,
		hasFilters,
		onChangePage,
		onChangeTitle,
		onResetFilters,
		onChangeIsMy,
		onChangeAuthor,
	} = useCompaniesFilters({ page: 1 });

	const {
		data: companiesData,
		isLoading,
		isError,
		refetch,
	} = useGetCompaniesListQuery({
		page: filters.page,
		limit: 10,
		titleOrLegalNameOrDescriptionSearch: filters.title,
		authorId: filters.isMy ? userId : filters.authorId,
	});

	const companies = companiesData?.data ?? [];
	const hasCompanies = companies.length > 0;

	const onSelectCompanies = (ids: SelectedAdminEntities<string>) => {
		dispatch(companiesPageActions.setSelectedCompanies(ids));
	};

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(Companies.STUB_EMPTY_COMPANIES_TITLE),
			subtitle: t(Companies.STUB_EMPTY_COMPANIES_SUBTITLE),
			buttonText: t(Companies.STUB_EMPTY_COMPANIES_SUBMIT),
			onClick: () => navigate(ROUTES.admin.companies.create.page),
		},
		'filter-empty': {
			title: t(Companies.STUB_FILTER_COMPANIES_TITLE),
			subtitle: t(Companies.STUB_FILTER_COMPANIES_SUBTITLE),
			buttonText: t(Companies.STUB_FILTER_COMPANIES_SUBMIT),
			onClick: onResetFilters,
		},
		error: {
			onClick: refetch,
		},
	};

	return (
		<PageWrapper
			isLoading={isLoading}
			skeleton={<CompaniesPageSkeleton />}
			hasError={isError}
			hasFilters={hasFilters}
			hasData={hasCompanies}
			roles={['admin', 'author']}
			paginationOptions={{
				page: filters.page || 1,
				onChangePage,
				limit: companiesData?.limit ?? 10,
				total: companiesData?.total ?? 0,
			}}
			stubs={stubs}
			content={
				<CompaniesTable
					companies={companies}
					selectedCompanies={selectedCompanies}
					onSelectCompanies={onSelectCompanies}
				/>
			}
		>
			{({ content, pagination }) => (
				<Flex componentType="main" direction="column" gap="24">
					<SearchSection
						to="create"
						showRemoveButton={selectedCompanies.length > 0}
						showResetFilterButton={hasFilters}
						searchValue={filters.title}
						onSearch={onChangeTitle}
						hasFilters={hasFilters}
						renderRemoveButton={() => (
							<DeleteCompaniesButton companiesToRemove={selectedCompanies} />
						)}
						renderFilter={() => (
							<CompaniesFilters
								filters={filters}
								onChangeIsMy={onChangeIsMy}
								onChangeAuthor={onChangeAuthor}
							/>
						)}
						onResetFilters={onResetFilters}
					/>
					<Card className={styles.content}>
						{content}
						{pagination}
					</Card>
				</Flex>
			)}
		</PageWrapper>
	);
};

export default CompaniesPage;
