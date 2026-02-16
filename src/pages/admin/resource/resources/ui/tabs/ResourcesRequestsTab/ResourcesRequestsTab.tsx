import { useSelector } from 'react-redux';

import { useAppDispatch, useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { getUserId } from '@/entities/profile';
import { SelectedResourceRequestEntities, useGetResourceRequestsQuery } from '@/entities/resource';

import { useResourceRequestsFilters } from '@/features/resources/filterResourceRequests';
import { ResourceRequestsFilters } from '@/features/resources/filterResourceRequests';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { SearchSection } from '@/widgets/SearchSection';

import { getResourcesRequestsTabSelected } from '../../../model/selectors/resourcesRequestsTabSelectors';
import { resourcesRequestsTabActions } from '../../../model/slice/resourcesRequestsTabSlice';
import { ResourceRequestsTable } from '../../ResourceRequestsTable/ResourceRequestsTable';

import styles from './ResourcesRequestsTab.module.css';

export const ResourcesRequestsTab = () => {
	const dispatch = useAppDispatch();
	const selectedResourceRequests = useSelector(getResourcesRequestsTabSelected);
	const userId = useAppSelector(getUserId);

	const {
		filters,
		hasFilters,
		onChangePage,
		onChangeTitle,
		onChangeStatus,
		onChangeTypes,
		onChangeSkills,
		onResetFilters,
		onChangeIsMy,
	} = useResourceRequestsFilters({
		page: 1,
	});

	const queryArgs = {
		page: filters.page,
		limit: 10,
		name: filters.title,
		status: filters.status === 'all' ? undefined : filters.status,
		types: filters.types?.length ? filters.types : undefined,
		skills: filters.skills?.length ? filters.skills : undefined,
		authorId: filters.isMy ? userId : undefined,
	};

	const {
		data: resourceRequests,
		isLoading,
		error,
		refetch,
	} = useGetResourceRequestsQuery(queryArgs);

	const onSelectResourceRequests = (ids: SelectedResourceRequestEntities) => {
		dispatch(resourcesRequestsTabActions.setSelectedResourceRequests(ids));
	};

	const hasRealFilters =
		filters.status !== 'all' ||
		(filters.types?.length ?? 0) > 0 ||
		(filters.skills?.length ?? 0) > 0 ||
		filters.isMy === true;

	const hasData = (resourceRequests?.data?.length || 0) > 0;
	const hasError = !!error;

	const isSearching = (filters.title?.trim().length ?? 0) > 0;

	const stubs: PageWrapperStubs = {
		empty: {
			title: 'Похоже здесь пока нет заявок на ресурсы',
			subtitle: 'Как только создадут первую заявку, она здесь отобразится',
		},

		'filter-empty': {
			onClick: onResetFilters,
		},
		error: {
			onClick: () => refetch(),
		},
	};

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={hasError}
			hasFilters={hasRealFilters && !isSearching}
			hasData={hasData}
			stubs={stubs}
			paginationOptions={{
				page: filters.page || 1,
				onChangePage,
				limit: resourceRequests?.limit || 0,
				total: resourceRequests?.total || 0,
			}}
			content={
				<ResourceRequestsTable
					resourceRequests={resourceRequests?.data}
					selectedResourceRequests={selectedResourceRequests}
					onSelectResourceRequests={onSelectResourceRequests}
				/>
			}
		>
			{({ content, pagination }) => (
				<Flex componentType="main" direction="column" gap="24">
					<SearchSection
						hasFilters={hasFilters}
						onSearch={onChangeTitle}
						searchValue={filters.title}
						showRemoveButton={selectedResourceRequests?.length > 0}
						renderFilter={() => (
							<ResourceRequestsFilters
								filters={filters}
								onChangeTitle={onChangeTitle}
								onChangeStatus={onChangeStatus}
								onChangeTypes={onChangeTypes}
								onChangeSkills={onChangeSkills}
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
