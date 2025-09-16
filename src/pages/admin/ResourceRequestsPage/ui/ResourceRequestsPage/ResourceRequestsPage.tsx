import { useSelector } from 'react-redux';

import { useAppDispatch, useQueryFilter } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { EmptyStub } from '@/shared/ui/EmptyStub';
import { Flex } from '@/shared/ui/Flex';

import { useGetResourceRequestsQuery, SelectedResourceRequestEntities } from '@/entities/resource';

import { ResourceRequestsTable } from '@/widgets/resources';
import { SearchSection } from '@/widgets/SearchSection';

import {
	getResourceRequestsSearch,
	getSelectedResourceRequests,
} from '../../model/selectors/resourceRequestsPageSelectors';
import { resourceRequestsPageActions } from '../../model/slice/resourceRequestsPageSlice';
import { ResourceRequestsPagePagination } from '../ResourceRequestsPagePagination/ResourceRequestsPagePagination';

import styles from './ResourceRequestsPage.module.css';

export const ResourceRequestsPage = () => {
	const dispatch = useAppDispatch();
	const search = useSelector(getResourceRequestsSearch);
	const selectedResourceRequests = useSelector(getSelectedResourceRequests);

	const { filter, handleFilterChange, resetFilters } = useQueryFilter();
	const { page } = filter;

	const { data: resourceRequests } = useGetResourceRequestsQuery({
		page: page || 1,
		limit: 10,
		name: search || undefined,
	});

	const onSelectResourceRequests = (ids: SelectedResourceRequestEntities) => {
		dispatch(resourceRequestsPageActions.setSelectedResourceRequests(ids));
	};

	const onChangePage = (page: number) => {
		handleFilterChange({ page });
		dispatch(resourceRequestsPageActions.setSelectedResourceRequests([]));
	};

	const onChangeSearch = (value: string) => {
		dispatch(resourceRequestsPageActions.setSearch(value));
		dispatch(resourceRequestsPageActions.setSelectedResourceRequests([]));
	};

	return (
		<Flex componentType="main" direction="column" gap="24">
			<SearchSection
				onSearch={onChangeSearch}
				searchValue={search}
				showRemoveButton={selectedResourceRequests?.length > 0}
			/>

			<Card className={styles.content}>
				<ResourceRequestsTable
					resourceRequests={resourceRequests?.data}
					selectedResourceRequests={selectedResourceRequests}
					onSelectResourceRequests={onSelectResourceRequests}
				/>

				{resourceRequests?.data && resourceRequests.data.length > 0 && (
					<ResourceRequestsPagePagination
						resourceRequestsResponse={resourceRequests}
						currentPage={page || 1}
						onPageChange={onChangePage}
					/>
				)}

				{resourceRequests?.data && resourceRequests.data.length === 0 && (
					<EmptyStub
						text={search ? `По запросу "${search}" ничего не найдено` : 'Нет данных'}
						resetFilters={resetFilters}
					/>
				)}
			</Card>
		</Flex>
	);
};
