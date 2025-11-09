import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useAppSelector } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { getIsAuthor, getUserId } from '@/entities/profile';
import { isResourceDisabled, useGetResourcesListQuery } from '@/entities/resource';

import { useResourcesFilters } from '@/features/resources/filterResources';

import { ResourcesTable } from '@/widgets/resources/ResourcesTable';
import { SearchSection } from '@/widgets/SearchSection';

import { getResourcesAllTabSelected } from '../../../../model/selectors/resourcesAllTabSelectors';
import { ResourcesAllTabPagination } from '../ResourcesAllTabPagination/ResourcesAllTabPagination';

import styles from './ResourcesAllTab.module.css';

export const ResourcesAllTab = () => {
	const isAuthor = useAppSelector(getIsAuthor);
	const userId = useAppSelector(getUserId);
	const selectedResources = useSelector(getResourcesAllTabSelected);

	const { onChangeTitle, filters, onChangePage } = useResourcesFilters({ page: 1 });

	const { data: resources } = useGetResourcesListQuery({
		page: filters.page,
		name: filters.title,
	});

	const resourcesWithEditFlags = useMemo(() => {
		if (!resources?.data) return [];
		return resources?.data.map((resource) => ({
			...resource,
			disabled: isResourceDisabled({ isAuthor, userId, createdById: resource?.createdBy.id }),
		}));
	}, [resources, userId, isAuthor]);

	return (
		<Flex componentType="main" direction="column" gap="24">
			<SearchSection
				to="create"
				showRemoveButton={selectedResources.length > 0}
				searchValue={filters.title}
				onSearch={onChangeTitle}
			/>
			<Card className={styles.content}>
				<ResourcesTable resources={resourcesWithEditFlags} />
				<ResourcesAllTabPagination
					resourcesResponse={resources}
					currentPage={filters.page || 1}
					onPageChange={onChangePage}
				/>
			</Card>
		</Flex>
	);
};
