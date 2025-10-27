import { useSelector } from 'react-redux';

import { useAppDispatch, useQueryFilter } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { EmptyFilterStub } from '@/shared/ui/EmptyFilterStub';
import { Flex } from '@/shared/ui/Flex';

import { useGetResourceRequestsQuery, SelectedResourceRequestEntities } from '@/entities/resource';

import { ResourceRequestsTable } from '@/widgets/resources/ResourceRequestsTable';
import { SearchSection } from '@/widgets/SearchSection';

import {
	getResourcesRequestsTabSearch,
	getResourcesRequestsTabSelected,
	getResourcesRequestsTabPage,
} from '../../../../model/selectors/resourcesRequestsTabSelectors';
import { resourcesRequestsTabActions } from '../../../../model/slice/resourcesRequestsTabSlice';
import { ResourcesRequestsTabPagination } from '../ResourcesRequestsTabPagination/ResourcesRequestsTabPagination';

import styles from './ResourcesRequestsTab.module.css';

export const ResourcesRequestsTab = () => {
	const dispatch = useAppDispatch();
	const search = useSelector(getResourcesRequestsTabSearch);
	const selectedResourceRequests = useSelector(getResourcesRequestsTabSelected);
	const storedPage = useSelector(getResourcesRequestsTabPage);

	const { filter, handleFilterChange, resetFilters } = useQueryFilter();
	const currentPage = filter.page || storedPage;

	const { data: resourceRequests } = useGetResourceRequestsQuery({
		page: currentPage,
		limit: 10,
		name: search || undefined,
	});

	const onSelectResourceRequests = (ids: SelectedResourceRequestEntities) => {
		dispatch(resourcesRequestsTabActions.setSelectedResourceRequests(ids));
	};

	const onChangePage = (page: number) => {
		handleFilterChange({ page });
		dispatch(resourcesRequestsTabActions.setSelectedResourceRequests([]));
	};

	const onChangeSearch = (value: string) => {
		dispatch(resourcesRequestsTabActions.setSearch(value));
		dispatch(resourcesRequestsTabActions.setSelectedResourceRequests([]));
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
					<ResourcesRequestsTabPagination
						resourcesRequestsResponse={resourceRequests}
						currentPage={currentPage}
						onPageChange={onChangePage}
					/>
				)}

				{resourceRequests?.data && resourceRequests.data.length === 0 && (
					<EmptyFilterStub
						text={search ? `По запросу "${search}" ничего не найдено` : 'Нет данных'}
						resetFilters={resetFilters}
					/>
				)}
			</Card>
		</Flex>
	);
};
