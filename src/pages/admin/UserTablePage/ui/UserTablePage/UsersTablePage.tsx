import { useState } from 'react';
import { useSelector } from 'react-redux';

import { useDebounce, useQueryParams } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetUsersListQuery } from '@/entities/user';

import { ResetFiltersButton } from '@/features/user/resetUsers';
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
	const [search, setSearch] = useState('');
	const { filter } = useUserFilter();
	const { setQueryParams } = useQueryParams();

	const { data: users } = useGetUsersListQuery({ page, limit: 10, search, ...filter });

	const onChangeSearch = useDebounce((value: string) => {
		setSearch(value);
		setQueryParams({ page: 1 });
	}, 500);

	const hasActiveFiltersOrSearch =
		(filter.roles && filter.roles.length > 0) ||
		(filter.isEmailVerified !== undefined && filter.isEmailVerified !== null) ||
		(search && search.trim() !== '');

	return (
		<Flex componentType="main" direction="column" gap="24">
			<SearchSection
				onSearch={onChangeSearch}
				searchValue={search}
				renderFilter={() => <UsersFilterSet />}
				showRemoveButton={!!hasActiveFiltersOrSearch}
				renderRemoveButton={() => <ResetFiltersButton resetSearch={() => setSearch('')} />}
			/>
			<Card className={styles.content}>
				<UsersTable users={users?.data} />
				<UserTablePagePagination usersResponse={users} />
			</Card>
		</Flex>
	);
};

export default UsersTablePage;
