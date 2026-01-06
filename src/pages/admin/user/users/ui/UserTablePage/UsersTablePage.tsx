import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetUsersListQuery } from '@/entities/user';

import { UsersFilters, useUsersFilters } from '@/features/user/filterUsers';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { SearchSection } from '@/widgets/SearchSection';

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

	const { data: users, isLoading } = useGetUsersListQuery({
		page: filters.page,
		search: filters.search,
		isVerified: filters.isVerified || undefined,
		roles: filters.roles,
		limit: 10,
	});

	const userData = users?.data ?? [];

	const stubs: PageWrapperStubs = {
		'filter-empty': {
			onClick: onResetFilters,
		},
	};

	return (
		<PageWrapper
			isLoading={isLoading}
			hasFilters={hasFilters}
			hasData={userData.length > 0}
			stubs={stubs}
			paginationOptions={{
				page: filters.page || 1,
				onChangePage,
				limit: users?.limit || 0,
				total: users?.total || 0,
			}}
			content={<UsersTable users={users?.data} />}
		>
			{({ content, pagination }) => (
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

export default UsersTablePage;
