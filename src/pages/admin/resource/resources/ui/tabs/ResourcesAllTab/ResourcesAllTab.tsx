import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Resources, ROUTES } from '@/shared/config';
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
	const navigate = useNavigate();
	const isAuthor = useAppSelector(getIsAuthor);
	const userId = useAppSelector(getUserId);
	const selectedResources = useSelector(getResourcesAllTabSelected);
	const { t } = useTranslation(i18Namespace.resources);

	const {
		onChangeTitle,
		filters,
		onChangePage,
		onResetFilters,
		onChangeSkills,
		onChangeTypes,
		onChangeSpecialization,
		onChangeIsMy,
	} = useResourcesFilters({ page: 1 });

	const {
		data: resources,
		isLoading,
		isError,
		refetch,
		isFetching,
	} = useGetResourcesListQuery({
		page: filters.page,
		name: filters.title,
		skills: filters.skills,
		specializations: filters.specialization,
		types: filters.types,
		authorId: filters.isMy ? userId : undefined,
	});

	const resourcesWithEditFlags = useMemo(() => {
		if (!resources?.data) return [];
		return resources.data.map((resource) => ({
			...resource,
			disabled: isResourceDisabled({ isAuthor, userId, createdById: resource?.createdBy.id }),
		}));
	}, [resources, userId, isAuthor]);

	const hasRealFilters =
		(filters.skills?.length ?? 0) > 0 ||
		(filters.types?.length ?? 0) > 0 ||
		filters.specialization != null ||
		filters.isMy === true;

	const hasSearch = (filters.title?.trim()?.length ?? 0) > 0;

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(Resources.STUB_EMPTY_RESOURCES_TITLE),
			subtitle: t(Resources.STUB_EMPTY_RESOURCES_SUBTITLE),
			buttonText: t(Resources.STUB_EMPTY_RESOURCES_SUBMIT),
			onClick: () => navigate(ROUTES.admin.resources.create.page),
		},
		error: {
			onClick: refetch,
		},
		'filter-empty': {
			onClick: onResetFilters,
		},
	};

	const hasData = !!resources && (resources.data?.length ?? 0) > 0;
	const hasError = !!isError;

	const pageWrapperHasFilters = hasRealFilters && !hasSearch;

	return (
		<PageWrapper
			isLoading={isLoading || isFetching}
			hasFilters={pageWrapperHasFilters}
			hasData={hasData}
			hasError={hasError}
			stubs={stubs}
			roles={['admin', 'author']}
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
						hasFilters={pageWrapperHasFilters || hasSearch}
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
						{content}
						{pagination}
					</Card>
				</Flex>
			)}
		</PageWrapper>
	);
};
