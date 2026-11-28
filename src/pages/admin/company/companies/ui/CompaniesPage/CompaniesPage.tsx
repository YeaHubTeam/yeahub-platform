import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Companies, i18Namespace } from '@/shared/config';
import { SelectedAdminEntities, useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { listAdminRoles } from '@/entities/auth';
import { useGetCompaniesListQuery } from '@/entities/company';
import { getUserId } from '@/entities/profile';

import { CompaniesFilters, useCompaniesFilters } from '@/features/company/filterCompanies';

import { CompaniesTable, mapCompaniesToTableItems } from '@/widgets/CompaniesTable';
import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { SearchSection } from '@/widgets/SearchSection';

import styles from './CompaniesPage.module.css';
import { CompaniesPageSkeleton } from './CompaniesPage.skeleton';

const CompaniesPage = () => {
	const [selectedCompanies, setSelectedCompanies] = useState<SelectedAdminEntities<string>>([]);
	const { t } = useTranslation(i18Namespace.companies);
	const userId = useAppSelector(getUserId);

	const {
		filters,
		hasFilters,
		hasDrawerFilters,
		onChangePage,
		onChangeTitle,
		onResetFilters,
		onChangeIsMy,
		onChangeAuthor,
	} = useCompaniesFilters({ page: 1 });

	const {
		data: companiesResponse,
		isLoading,
		isError,
		refetch,
	} = useGetCompaniesListQuery({
		page: filters.page,
		limit: 10,
		titleOrLegalNameOrDescriptionSearch: filters.title,
		authorId: filters.isMy ? userId : filters.authorId,
	});

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(Companies.STUB_EMPTY_COMPANIES_TITLE),
			subtitle: t(Companies.STUB_EMPTY_COMPANIES_SUBTITLE),
		},
		'filter-empty': {
			title: t(Companies.STUB_FILTER_COMPANIES_TITLE),
			subtitle: t(Companies.STUB_FILTER_COMPANIES_SUBTITLE),
			buttonText: t(Companies.STUB_FILTER_COMPANIES_SUBMIT),
			onClick: onResetFilters,
		},
		error: { onClick: refetch },
	};

	return (
		<PageWrapper
			roles={listAdminRoles}
			isLoading={isLoading}
			skeleton={<CompaniesPageSkeleton />}
			hasError={isError}
			hasFilters={hasFilters}
			hasData={Boolean(companiesResponse?.data?.length)}
			stubs={stubs}
			content={
				<CompaniesTable
					companies={mapCompaniesToTableItems(companiesResponse?.data ?? [])}
					selectedCompanies={selectedCompanies}
					onSelectCompanies={setSelectedCompanies}
				/>
			}
			paginationOptions={{
				page: filters.page || 1,
				limit: companiesResponse?.limit || 10,
				total: companiesResponse?.total || 0,
				onChangePage,
			}}
		>
			{({ content, pagination }) => (
				<Flex componentType="main" direction="column" gap="24">
					<SearchSection
						searchValue={filters.title}
						onSearch={onChangeTitle}
						hasFilters={hasDrawerFilters}
						showResetFilterButton={hasFilters}
						onResetFilters={onResetFilters}
						renderFilter={() => (
							<CompaniesFilters
								filters={filters}
								onChangeIsMy={onChangeIsMy}
								onChangeAuthor={onChangeAuthor}
							/>
						)}
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
