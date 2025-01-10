import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useDebounce } from '@/shared/hooks/useDebounced';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetUsersListQuery } from '@/entities/user';

import { UsersFilterSet, useUserFilter } from '@/features/admin/UsersFilterSet';

import { SearchSection } from '@/widgets/SearchSection';
import { UsersTable } from '@/widgets/UsersTable';

import { getUsersPageNum, getUsersSearch } from '../../model/selectors/usersPageSelectors';
import { usersPageActions } from '../../model/slices/usersPageSlice';
import { UserTablePagePagination } from '../UserTablePagePagination/UserTablePagePagination';

import styles from './UsersTablePage.module.css';

/**
 * Page showing info about all the created users
 * @constructor
 */

export const UsersTablePage = () => {
	const dispatch = useAppDispatch();
	const page = useSelector(getUsersPageNum);
	const search = useSelector(getUsersSearch);
	const { filter } = useUserFilter();

	const { data: users } = useGetUsersListQuery({ page, limit: 10, search, ...filter });

	const onChangeSearch = useDebounce((value: string) => {
		dispatch(usersPageActions.setSearch(value));
	}, 500);

	return (
		<Flex componentType="main" direction="column" gap="24">
			<SearchSection onSearch={onChangeSearch} renderFilter={() => <UsersFilterSet />} />
			<Card className={styles.content}>
				<UsersTable users={users?.data} />
				<UserTablePagePagination usersResponse={users} />
			</Card>
		</Flex>
	);
};

export default UsersTablePage;
