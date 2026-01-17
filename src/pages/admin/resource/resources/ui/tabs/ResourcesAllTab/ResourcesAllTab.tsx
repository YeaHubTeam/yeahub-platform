import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { getIsAuthor, getUserId } from '@/entities/profile';
import { isResourceDisabled, useGetResourcesListQuery } from '@/entities/resource';

import { ResourcesFilters, useResourcesFilters } from '@/features/resources/filterResources';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { SearchSection } from '@/widgets/SearchSection';

import { getResourcesAllTabSelected } from '../../../model/selectors/resourcesAllTabSelectors';
import { ResourcesTable } from '../../ResourcesTable/ResourcesTable';

import styles from './ResourcesAllTab.module.css';

export const ResourcesAllTab = () => {
	const isAuthor = useAppSelector(getIsAuthor);
	const userId = useAppSelector(getUserId);
	const selectedResources = useSelector(getResourcesAllTabSelected);

	const {
		onChangeTitle,
		filters,
		onChangePage,
		onResetFilters,
		hasFilters,
		onChangeSkills,
		onChangeTypes,
		onChangeSpecialization,
		onChangeIsMy,
	} = useResourcesFilters({
		page: 1,
	});

	const { data: resources, isLoading } = useGetResourcesListQuery({
		page: filters.page,
		name: filters.title,
		skills: filters.skills,
		specializations: filters.specialization,
		types: filters.types,
		authorId: filters.isMy ? userId : undefined,
	});

	const resourcesWithEditFlags = useMemo(() => {
		if (!resources?.data) return [];

		return resources?.data.map((resource) => ({
			...resource,
			disabled: isResourceDisabled({ isAuthor, userId, createdById: resource?.createdBy.id }),
		}));
	}, [resources, userId, isAuthor]);

	const stubs: PageWrapperStubs = {
		'filter-empty': {
			onClick: onResetFilters,
		},
	};

	return (
		<PageWrapper
			isLoading={isLoading}
			hasFilters={hasFilters}
			hasData={(resources?.data || []).length > 0}
			stubs={stubs}
			paginationOptions={{
				page: filters.page || 1,
				onChangePage,
				limit: resources?.limit || 0,
				total: resources?.total || 0,
			}}
			content={<ResourcesTable resources={resourcesWithEditFlags} />}
		>
			{({ content, pagination }) => (
				<Flex componentType="main" direction="column" gap="24">
					<SearchSection
						to="create"
						showRemoveButton={selectedResources.length > 0}
						onSearch={onChangeTitle}
						searchValue={filters.title}
						hasFilters={hasFilters}
						renderFilter={() => (
							<ResourcesFilters
								filters={filters}
								onChangeTitle={onChangeTitle}
								onChangeSkills={onChangeSkills}
								onChangeTypes={onChangeTypes}
								onChangeSpecialization={onChangeSpecialization}
								onChangeIsMy={onChangeIsMy}
							/>
						)}
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
