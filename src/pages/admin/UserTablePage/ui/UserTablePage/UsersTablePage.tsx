import { useState } from 'react';
import { useSelector } from 'react-redux';

import { useDebounce, useQueryParams } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { EmptyStub } from '@/shared/ui/EmptyStub';
import { Flex } from '@/shared/ui/Flex';
import { ResetFiltersButton } from '@/shared/ui/ResetFiltersButton';

import { useGetUsersListQuery } from '@/entities/user';

import { UsersFilterSet, useUserFilter } from '@/features/user/UsersFilterSet';

import { SearchSection } from '@/widgets/SearchSection';
import { UsersTable } from '@/widgets/UsersTable';

import { getUsersPageNum } from '../../model/selectors/usersPageSelectors';
import { UserTablePagePagination } from '../UserTablePagePagination/UserTablePagePagination';

import styles from './UsersTablePage.module.css';

/**
 * Page showing info about all the created users
 * @constructor
 */

export const UsersTablePage = () => {
	const page = useSelector(getUsersPageNum);
	const [searchValue, setSearchValue] = useState('');
	const [search, setSearch] = useState('');

	const { filter, handleFilterChange, resetFilters } = useUserFilter();

	const { setQueryParams } = useQueryParams();

	const { data: users, isFetching } = useGetUsersListQuery({ page, limit: 10, search, ...filter });

	const debouncedSearch = useDebounce((value: string) => {
		setSearch(value);
		setQueryParams({ page: 1 });
	}, 500);

	const hasActiveFiltersOrSearch =
		(filter.roles && filter.roles.length > 0) || filter.isEmailVerified || search.trim();

	const onResetFilters = () => {
		handleFilterChange({ roles: undefined, isEmailVerified: undefined });
		setSearch('');
		setSearchValue('');
		resetFilters();
	};

	const onChangeSearch = (value: string) => {
		setSearchValue(value);
		debouncedSearch(value);
	};

	const userData = users?.data ?? [];
	const isEmpty = !isFetching && userData.length === 0;

	const resetAll = onResetFilters;

	return (
		<Flex componentType="main" direction="column" gap="24">
			<SearchSection
				renderFilter={() => <UsersFilterSet />}
				showRemoveButton={!!hasActiveFiltersOrSearch}
				renderRemoveButton={() => <ResetFiltersButton onResetFilters={onResetFilters} />}
				searchValue={searchValue}
				onSearch={onChangeSearch}
			/>
			<Card className={styles.content}>
				<UsersTable users={users?.data} />
				<UserTablePagePagination usersResponse={users} />
				{isEmpty && <EmptyStub resetFilters={resetAll} />}
			</Card>
		</Flex>
	);
};

export default UsersTablePage;
