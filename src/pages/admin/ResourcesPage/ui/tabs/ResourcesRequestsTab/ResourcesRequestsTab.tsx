import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Stub } from '@/shared/ui/Stub';
import { TablePagination } from '@/shared/ui/TablePagination';

import { SelectedResourceRequestEntities, useGetResourceRequestsQuery } from '@/entities/resource';

import { useResourceRequestsFilters } from '@/features/resources/filterResourceRequests';

import { ResourceRequestsTable } from '@/widgets/resources/ResourceRequestsTable';
import { SearchSection } from '@/widgets/SearchSection';

import { getResourcesRequestsTabSelected } from '../../../model/selectors/resourcesRequestsTabSelectors';
import { resourcesRequestsTabActions } from '../../../model/slice/resourcesRequestsTabSlice';

import styles from './ResourcesRequestsTab.module.css';

export const ResourcesRequestsTab = () => {
	const dispatch = useAppDispatch();
	const selectedResourceRequests = useSelector(getResourcesRequestsTabSelected);

	const { filters, onChangePage, onChangeTitle, onResetFilters } = useResourceRequestsFilters({
		page: 1,
	});

	const { data: resourceRequests } = useGetResourceRequestsQuery({
		page: filters.page,
		limit: 10,
		search: filters.title,
	});

	const onSelectResourceRequests = (ids: SelectedResourceRequestEntities) => {
		dispatch(resourcesRequestsTabActions.setSelectedResourceRequests(ids));
	};

	return (
		<Flex componentType="main" direction="column" gap="24">
			<SearchSection
				onSearch={onChangeTitle}
				searchValue={filters.title}
				showRemoveButton={selectedResourceRequests?.length > 0}
			/>
			<Card className={styles.content}>
				{resourceRequests && (
					<>
						<ResourceRequestsTable
							resourceRequests={resourceRequests?.data}
							selectedResourceRequests={selectedResourceRequests}
							onSelectResourceRequests={onSelectResourceRequests}
						/>
						<TablePagination
							page={filters.page || 1}
							onChangePage={onChangePage}
							limit={resourceRequests.limit}
							total={resourceRequests.total}
						/>
					</>
				)}
				{resourceRequests?.data && resourceRequests.data.length === 0 && (
					<Stub type={'filter-empty'} onClick={onResetFilters} />
				)}
			</Card>
		</Flex>
	);
};
