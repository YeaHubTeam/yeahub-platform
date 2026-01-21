import { useMemo } from 'react';

import { useAppDispatch, useAppSelector, SelectedAdminEntities } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetCompaniesListQuery } from '@/entities/company';
import { getIsAuthor, getUserId } from '@/entities/profile';

import { DeleteCompaniesButton } from '@/features/company/deleteCompanies';
import { CompaniesFilters, useCompaniesFilters } from '@/features/company/filterCompanies';

import { CompaniesTable } from '@/widgets/CompaniesTable';
import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { SearchSection } from '@/widgets/SearchSection';

import { CompaniesTablePageSkeleton } from '@/pages/admin/company/companies';

import { getSelectedCompanies } from '../../model/selectors/companiesTablePageSelectors';
import { companiesTablePageActions } from '../../model/slices/companiesTablePageSlice';

import styles from './CompaniesTablePage.module.css';

const CompaniesTablePage = () => {
	const selectedCompanies = useAppSelector(getSelectedCompanies);
	const isAuthor = useAppSelector(getIsAuthor);
	const dispatch = useAppDispatch();
	const { filters, hasFilters, onChangePage, onChangeTitle, onResetFilters, onChangeIsMy } =
		useCompaniesFilters({ page: 1 });

	const userId = useAppSelector(getUserId);

	const onSelectCompanies = (ids: SelectedAdminEntities) => {
		dispatch(companiesTablePageActions.setSelectedCompanies(ids));
	};

	const { data: companies, isLoading } = useGetCompaniesListQuery({
		page: filters.page,
		limit: 10,
		titleOrLegalNameOrDescriptionSearch: filters.title,
		authorId: filters.isMy ? userId : undefined,
	});

	const companiesWithEditFlags = useMemo(() => {
		if (!companies?.data) return [];
		return companies?.data.map((company) => ({
			...company,
			disabled: isAuthor && company.createdBy?.id !== userId,
		}));
	}, [companies, userId, isAuthor]);

	const stubs: PageWrapperStubs = {
		'filter-empty': {
			onClick: onResetFilters,
		},
	};

	return (
		<PageWrapper
			isLoading={isLoading}
			skeleton={<CompaniesTablePageSkeleton />}
			hasFilters={hasFilters}
			hasData={companiesWithEditFlags.length > 0}
			stubs={stubs}
			paginationOptions={{
				page: filters.page || 1,
				onChangePage,
				limit: companies?.limit || 0,
				total: companies?.total || 0,
			}}
			content={
				<CompaniesTable
					companies={companiesWithEditFlags}
					selectedCompanies={selectedCompanies}
					onSelectCompanies={onSelectCompanies}
				/>
			}
		>
			{({ content, pagination }) => (
				<Flex componentType="main" direction="column" gap="24">
					<SearchSection
						to="create"
						onSearch={onChangeTitle}
						searchValue={filters.title}
						hasFilters={hasFilters}
						showRemoveButton={selectedCompanies.length > 0}
						renderRemoveButton={() => (
							<DeleteCompaniesButton companiesToRemove={selectedCompanies} />
						)}
						renderFilter={() => <CompaniesFilters filters={filters} onChangeIsMy={onChangeIsMy} />}
					/>
					<Card className={styles.content}>
						<>
							{content}
							{pagination}
						</>
					</Card>
				</Flex>
			)}
		</PageWrapper>
	);
};

export default CompaniesTablePage;
