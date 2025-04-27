import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch, useDebounce, useQueryFilter } from '@/shared/hooks';
import { SelectedAdminEntities } from '@/shared/types/types';
import { Card } from '@/shared/ui/Card';
import { EmptyStub } from '@/shared/ui/EmptyStub';
import { Flex } from '@/shared/ui/Flex';

import { useGetCompaniesListQuery } from '@/entities/company';

import { DeleteCompaniesButton } from '@/features/company/deleteCompanies';

import { CompaniesTable } from '@/widgets/CompaniesTable';
import { SearchSection } from '@/widgets/SearchSection';

import {
	getCompaniesSearch,
	getSelectedCompanies,
} from '../../model/selectors/companiesTablePageSelectors';
import { companiesTablePageActions } from '../../model/slices/companiesTablePageSlice';
import { CompaniesTablePagePagination } from '../CompaniesTablePagePagination/CompaniesTablePagePagination';

import styles from './CompaniesTablePage.module.css';

const CompaniesTablePage = () => {
	const [localSearchValue, setLocalSearchValue] = useState<string>('');
	const storeSearchValue = useSelector(getCompaniesSearch);
	const selectedCompanies = useSelector(getSelectedCompanies);
	const dispatch = useAppDispatch();
	const { filter, handleFilterChange, resetFilters } = useQueryFilter(() => {
		dispatch(companiesTablePageActions.setSearch(''));
	});

	const onSelectCompanies = (ids: SelectedAdminEntities) => {
		dispatch(companiesTablePageActions.setSelectedCompanies(ids));
	};

	const onChangePage = (page: number) => {
		handleFilterChange({ page });
	};

	const { data: companies } = useGetCompaniesListQuery({
		...filter,
		limit: 5,
		titleOrLegalNameOrDescriptionSearch: storeSearchValue,
		status: undefined,
	});

	const setStoreSearchValue = useDebounce((value: string) => {
		dispatch(companiesTablePageActions.setSearch(value));
	}, 500);

	//TODO: подумать, как уйти от локального состояния и при этом сохранить функциональность поиска и сброса фильтров
	const handleSearchChange = (value: string) => {
		setLocalSearchValue(value);
		setStoreSearchValue(value);
	};

	useEffect(() => {
		setLocalSearchValue(storeSearchValue);
	}, [storeSearchValue]);

	if (!companies) {
		return null;
	}

	return (
		<Flex componentType="main" direction="column" gap="24">
			<SearchSection
				to="create"
				onSearch={handleSearchChange}
				searchValue={localSearchValue}
				showRemoveButton={selectedCompanies.length > 0}
				renderRemoveButton={() => <DeleteCompaniesButton companiesToRemove={selectedCompanies} />}
			/>
			<Card className={styles.content}>
				<CompaniesTable
					companies={companies?.data}
					selectedCompanies={selectedCompanies}
					onSelectCompanies={onSelectCompanies}
				/>

				<CompaniesTablePagePagination
					companiesResponse={companies}
					currentPage={filter.page || 1}
					onChangePage={onChangePage}
				/>

				{companies.data.length === 0 && (
					<EmptyStub text={filter.title} resetFilters={resetFilters} />
				)}
			</Card>
		</Flex>
	);
};

export default CompaniesTablePage;
