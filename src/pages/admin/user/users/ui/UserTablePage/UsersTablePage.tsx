import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Stub } from '@/shared/ui/Stub';
import { TablePagination } from '@/shared/ui/TablePagination';

import { useGetUsersListQuery } from '@/entities/user';

import { SearchSection } from '@/widgets/SearchSection';

import { useUsersFilters } from '../../lib/hooks/useUsersFilters';
import { UsersFilters } from '../UsersFilters/UsersFilters';
import { UsersTable } from '../UsersTable/UsersTable';

import styles from './UsersTablePage.module.css';

export const UsersTablePage = () => {
	const {
		filters,
		hasFilters,
		onChangePage,
		onResetFilters,
		onChangeSearch,
		onChangeRoles,
		onChangeIsVerified,
	} = useUsersFilters({
		page: 1,
	});

	const { data: users, isFetching } = useGetUsersListQuery({
		page: filters.page,
		search: filters.search,
		isVerified: filters.isVerified || undefined,
		roles: filters.roles,
		limit: 10,
	});

	const userData = users?.data ?? [];
	const isEmpty = !isFetching && userData.length === 0;

	return (
		<Flex componentType="main" direction="column" gap="24">
			<SearchSection
				renderFilter={() => (
					<UsersFilters
						filters={filters}
						onChangeRoles={onChangeRoles}
						onChangeIsVerified={onChangeIsVerified}
					/>
				)}
				showResetFilterButton={hasFilters}
				hasFilters={hasFilters}
				searchValue={filters.search}
				onSearch={onChangeSearch}
				onResetFilters={onResetFilters}
			/>
			<Card className={styles.content}>
				{users && (
					<>
						<UsersTable users={users?.data} />
						<TablePagination
							page={filters.page || 1}
							onChangePage={onChangePage}
							limit={users.limit}
							total={users.total}
						/>
					</>
				)}
				{isEmpty && <Stub type="filter-empty" onClick={onResetFilters} />}
			</Card>
		</Flex>
	);
};

export default UsersTablePage;
