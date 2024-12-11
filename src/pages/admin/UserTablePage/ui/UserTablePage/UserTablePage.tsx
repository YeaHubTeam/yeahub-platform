import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetUsersListQuery } from '@/entities/user';

import { SearchSection } from '@/widgets/SearchSection';
import { UsersTable } from '@/widgets/UsersTable';

import { getUsersPageNum, getUsersSearch } from '../../model/selectors/usersPageSelectors';
import { usersPageActions } from '../../model/slices/usersPageSlice';
import { UserTablePagePagination } from '../UserTablePagePagination/UserTablePagePagination';

import styles from './UserTablePage.module.css';

/**
 * Page showing info about all the created skills
 * @constructor
 */

export const UserTablePage = () => {
	const dispatch = useAppDispatch();
	const page = useSelector(getUsersPageNum);
	const search = useSelector(getUsersSearch);

	const { data: users } = useGetUsersListQuery({ page, limit: 10, firstName: search });

	const onChangeSearch = (value: string) => {
		dispatch(usersPageActions.setSearch(value));
	};
	return (
		<Flex componentType="main" direction="column" gap="24">
			<Card className={styles.content}>
				<SearchSection
					to="create"
					onSearch={onChangeSearch}
					renderRemoveButton={function (): React.ReactNode {
						throw new Error('Function not implemented.');
					}}
				/>
				<UsersTable users={users?.data} />
				<UserTablePagePagination usersResponse={users} />
			</Card>
		</Flex>
	);
};

export default UserTablePage;
