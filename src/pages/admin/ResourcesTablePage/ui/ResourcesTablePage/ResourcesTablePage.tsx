import { useSelector } from 'react-redux';

import { useAppDispatch, useQueryFilter } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetResourcesListQuery } from '@/entities/resource';

import { ResourcesTable } from '@/widgets/resources/';
import { SearchSection } from '@/widgets/SearchSection';

import {
	getResourcesPageNum,
	getResourcesSearch,
	getSelectedResources,
} from '../../model/selectors/resourcesTablePageSelectors';
import { resourcesTablePageActions } from '../../model/slice/resourcesTablePageSlice';
import { ResourcesPagePagination } from '../ResourcesTablePagePagination/ResourcesTablePagePagination';

import styles from './ResourcesTablePage.module.css';

/**
 * Page showing info about all the created questions
 * @constructor
 */

const ResourcesTablePage = () => {
	const dispatch = useAppDispatch();
	const search = useSelector(getResourcesSearch);
	const selectedResources = useSelector(getSelectedResources);
	const page = useSelector(getResourcesPageNum);

	const { filter, handleFilterChange } = useQueryFilter();

	const { data: resources } = useGetResourcesListQuery({
		page,
		name: search,
	});

	const onChangeSearch = (value: string) => {
		dispatch(resourcesTablePageActions.setSearch(value));
	};

	const onPageChange = (page: number) => {
		handleFilterChange({ page });
		dispatch(resourcesTablePageActions.setPage(page));
	};

	return (
		<Flex componentType="main" direction="column" gap="24">
			<SearchSection
				to="create"
				showRemoveButton={selectedResources.length > 0}
				onSearch={onChangeSearch}
			/>
			<Card className={styles.content}>
				<ResourcesTable resources={resources?.data} />
				<ResourcesPagePagination
					resourcesResponse={resources}
					currentPage={filter.page || 1}
					onPageChange={onPageChange}
				/>
			</Card>
		</Flex>
	);
};

export default ResourcesTablePage;
