import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import {
	SelectedResourceRequestEntities,
	useGetResourceRequestsQuery,
	useGetMyRequestsResourcesQuery,
} from '@/entities/resource';

import { useResourceRequestsFilters } from '@/features/resources/filterResourceRequests';
import { useMyRequestsFilter } from '@/features/resources/myRequestsFilter';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { SearchSection } from '@/widgets/SearchSection';

import { getResourcesRequestsTabSelected } from '../../../model/selectors/resourcesRequestsTabSelectors';
import { resourcesRequestsTabActions } from '../../../model/slice/resourcesRequestsTabSlice';
import { ResourceRequestsTable } from '../../ResourceRequestsTable/ResourceRequestsTable';

import styles from './ResourcesRequestsTab.module.css';

export const ResourcesRequestsTab = () => {
	const dispatch = useAppDispatch();
	const selectedResourceRequests = useSelector(getResourcesRequestsTabSelected);

	const { filters, hasFilters, onChangePage, onChangeTitle, onResetFilters } =
		useResourceRequestsFilters({
			page: 1,
		});

	const { isMy } = useMyRequestsFilter();

	const queryArgs = {
		page: filters.page,
		limit: 10,
		name: filters.title,
	};

	const myRequestsQuery = useGetMyRequestsResourcesQuery(queryArgs);
	const allRequestsQuery = useGetResourceRequestsQuery(queryArgs);

	const resourceRequests = isMy ? myRequestsQuery.data : allRequestsQuery.data;
	const isLoading = isMy ? myRequestsQuery.isLoading : allRequestsQuery.isLoading;

	const onSelectResourceRequests = (ids: SelectedResourceRequestEntities) => {
		dispatch(resourcesRequestsTabActions.setSelectedResourceRequests(ids));
	};

	const stubs: PageWrapperStubs = {
		'filter-empty': {
			onClick: onResetFilters,
		},
	};

	return (
		<PageWrapper
			isLoading={isLoading}
			hasFilters={hasFilters}
			hasData={(resourceRequests?.data || []).length > 0}
			stubs={stubs}
			paginationOptions={{
				page: filters.page || 1,
				onChangePage,
				limit: resourceRequests?.limit || 0,
				total: resourceRequests?.total || 0,
			}}
			content={
				<>
					<ResourceRequestsTable
						resourceRequests={resourceRequests?.data}
						selectedResourceRequests={selectedResourceRequests}
						onSelectResourceRequests={onSelectResourceRequests}
					/>
					{/* <MyRequestsToggle /> */}
				</>
			}
		>
			{({ content, pagination }) => (
				<Flex componentType="main" direction="column" gap="24">
					<SearchSection
						onSearch={onChangeTitle}
						searchValue={filters.title}
						showRemoveButton={selectedResourceRequests?.length > 0}
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
