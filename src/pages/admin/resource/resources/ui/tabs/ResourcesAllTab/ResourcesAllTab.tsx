import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TablePagination } from '@/shared/ui/TablePagination';

import { getIsAuthor, getUserId } from '@/entities/profile';
import { isResourceDisabled, useGetResourcesListQuery } from '@/entities/resource';

import { useResourcesFilters } from '@/features/resources/filterResources';

import { SearchSection } from '@/widgets/SearchSection';

import { getResourcesAllTabSelected } from '../../../model/selectors/resourcesAllTabSelectors';
import { ResourcesTable } from '../../ResourcesTable/ResourcesTable';

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
				{resources && (
					<>
						<ResourcesTable resources={resourcesWithEditFlags} />
						<TablePagination
							page={filters.page || 1}
							onChangePage={onChangePage}
							limit={resources.limit}
							total={resources.total}
						/>
					</>
				)}
			</Card>
		</Flex>
	);
};
