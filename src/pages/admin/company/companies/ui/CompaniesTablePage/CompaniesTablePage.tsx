import { useMemo } from 'react';

import { useAppDispatch, useAppSelector, SelectedAdminEntities } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Stub } from '@/shared/ui/Stub';
import { TablePagination } from '@/shared/ui/TablePagination';

import { useGetCompaniesListQuery } from '@/entities/company';
import { getIsAuthor, getUserId } from '@/entities/profile';

import { DeleteCompaniesButton } from '@/features/company/deleteCompanies';
import { useCompaniesFilters } from '@/features/company/filterCompanies';

import { CompaniesTable } from '@/widgets/CompaniesTable';
import { SearchSection } from '@/widgets/SearchSection';

import { getSelectedCompanies } from '../../model/selectors/companiesTablePageSelectors';
import { companiesTablePageActions } from '../../model/slices/companiesTablePageSlice';

import styles from './CompaniesTablePage.module.css';

const CompaniesTablePage = () => {
	const selectedCompanies = useAppSelector(getSelectedCompanies);
	const isAuthor = useAppSelector(getIsAuthor);
	const dispatch = useAppDispatch();
	const { filters, onChangePage, onChangeTitle, onResetFilters } = useCompaniesFilters({ page: 1 });

	const userId = useAppSelector(getUserId);

	const onSelectCompanies = (ids: SelectedAdminEntities) => {
		dispatch(companiesTablePageActions.setSelectedCompanies(ids));
	};

	const { data: companies } = useGetCompaniesListQuery({
		page: filters.page,
		limit: 10,
		titleOrLegalNameOrDescriptionSearch: filters.title,
	});

	const companiesWithEditFlags = useMemo(() => {
		if (!companies?.data) return [];
		return companies?.data.map((company) => ({
			...company,
			disabled: isAuthor && company.createdBy?.id !== userId,
		}));
	}, [companies, userId, isAuthor]);

	if (!companies) {
		return null;
	}

	return (
		<Flex componentType="main" direction="column" gap="24">
			<SearchSection
				to="create"
				onSearch={onChangeTitle}
				searchValue={filters.title}
				showRemoveButton={selectedCompanies.length > 0}
				renderRemoveButton={() => <DeleteCompaniesButton companiesToRemove={selectedCompanies} />}
			/>
			<Card className={styles.content}>
				<CompaniesTable
					companies={companiesWithEditFlags}
					selectedCompanies={selectedCompanies}
					onSelectCompanies={onSelectCompanies}
				/>
				<TablePagination
					page={filters.page || 1}
					onChangePage={onChangePage}
					limit={companies.limit}
					total={companies.total}
				/>

				{companies.data.length === 0 && <Stub type={'filter-empty'} onClick={onResetFilters} />}
			</Card>
		</Flex>
	);
};

export default CompaniesTablePage;
