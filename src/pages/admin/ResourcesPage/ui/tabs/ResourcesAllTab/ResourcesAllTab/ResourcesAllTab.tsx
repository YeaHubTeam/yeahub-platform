import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch, useAppSelector, useQueryFilter } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { getIsAuthor, getUserId } from '@/entities/profile';
import { isResourceDisabled, useGetResourcesListQuery } from '@/entities/resource';

import { ResourcesTable } from '@/widgets/resources';
import { SearchSection } from '@/widgets/SearchSection';

import {
	getResourcesAllTabPage,
	getResourcesAllTabSearch,
	getResourcesAllTabSelected,
} from '../../../../model/selectors/resourcesAllTabSelectors';
import { resourcesAllTabActions } from '../../../../model/slice/resourcesAllTabSlice';
import { ResourcesAllTabPagination } from '../ResourcesAllTabPagination/ResourcesAllTabPagination';

import styles from './ResourcesAllTab.module.css';

export const ResourcesAllTab = () => {
	const dispatch = useAppDispatch();
	const isAuthor = useAppSelector(getIsAuthor);
	const userId = useAppSelector(getUserId);
	const search = useSelector(getResourcesAllTabSearch);
	const selectedResources = useSelector(getResourcesAllTabSelected);
	const page = useSelector(getResourcesAllTabPage);

	const { filter, handleFilterChange } = useQueryFilter();
	const currentPage = filter.page || page;

	const { data: resources } = useGetResourcesListQuery({
		page: currentPage,
		name: search,
	});

	const resourcesWithEditFlags = useMemo(() => {
		if (!resources?.data) return [];
		return resources?.data.map((resource) => ({
			...resource,
			disabled: isResourceDisabled({ isAuthor, userId, createdById: resource?.createdById }),
		}));
	}, [resources, userId, isAuthor]);

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
				<ResourcesTable resources={resourcesWithEditFlags} />
				<ResourcesAllTabPagination
					resourcesResponse={resources}
					currentPage={currentPage}
					onPageChange={onPageChange}
				/>
			</Card>
		</Flex>
	);
};
