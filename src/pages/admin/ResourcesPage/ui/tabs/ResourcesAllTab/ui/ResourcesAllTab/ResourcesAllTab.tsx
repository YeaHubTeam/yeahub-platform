import { useSelector } from 'react-redux';

import { useAppDispatch, useQueryFilter } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetResourcesListQuery } from '@/entities/resource';

import { ResourcesTable } from '@/widgets/resources';
import { SearchSection } from '@/widgets/SearchSection';

import {
	getResourcesAllTabPage,
	getResourcesAllTabSearch,
	getResourcesAllTabSelected,
} from '../../model/selectors/resourcesAllTabSelectors';
import { resourcesAllTabActions } from '../../model/slice/resourcesAllTabSlice';
import { ResourcesAllTabPagination } from '../ResourcesAllTabPagination/ResourcesAllTabPagination';

import styles from './ResourcesAllTab.module.css';

/**
 * Page showing info about all the created questions
 * @constructor
 */

const ResourcesAllTab = () => {
	const dispatch = useAppDispatch();
	const search = useSelector(getResourcesAllTabSearch);
	const selectedResources = useSelector(getResourcesAllTabSelected);
	const page = useSelector(getResourcesAllTabPage);

	const { filter, handleFilterChange } = useQueryFilter();
	const currentPage = filter.page || page;

	const { data: resources } = useGetResourcesListQuery({
		page: currentPage,
		name: search,
	});

	const onChangeSearch = (value: string) => {
		dispatch(resourcesAllTabActions.setSearch(value));
	};

	const onPageChange = (page: number) => {
		handleFilterChange({ page });
		dispatch(resourcesAllTabActions.setPage(page));
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
				<ResourcesAllTabPagination
					resourcesResponse={resources}
					currentPage={currentPage}
					onPageChange={onPageChange}
				/>
			</Card>
		</Flex>
	);
};

export default ResourcesAllTab;
