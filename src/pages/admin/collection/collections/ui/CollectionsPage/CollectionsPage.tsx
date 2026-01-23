import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Collections, i18Namespace, ROUTES } from '@/shared/config';
import { SelectedAdminEntities, useAppDispatch } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetCollectionsListQuery } from '@/entities/collection';
import { getIsAuthor, getUserId } from '@/entities/profile';

import {
	CollectionsFilters,
	useCollectionsFilters,
} from '@/features/collections/filterCollections';

import { CollectionsTable } from '@/widgets/CollectionsTable';
import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { SearchSection } from '@/widgets/SearchSection';

import { getSelectedCollections } from '../../model/selectors/collectionsPageSelectors';
import { collectionsPageActions } from '../../model/slices/collectionsPageSlice';

import styles from './CollectionsPage.module.css';
import { CollectionsPageSkeleton } from './CollectionsPage.skeleton';

const CollectionsPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { t } = useTranslation(i18Namespace.collection);
	const userId = useSelector(getUserId);
	const isAuthor = useSelector(getIsAuthor);
	const selectedCollections = useSelector(getSelectedCollections);
	const onSelectCollections = (ids: SelectedAdminEntities) => {
		dispatch(collectionsPageActions.setSelectedCollections(ids));
	};

	const {
		filters,
		hasFilters,
		onResetFilters,
		onChangeTitle,
		onChangePage,
		onChangeIsFree,
		onChangeSpecialization,
		onChangeIsMy,
	} = useCollectionsFilters({
		page: 1,
	});

	const onResetAll = () => {
		dispatch(collectionsPageActions.resetFilters());
		onResetFilters();
	};

	const {
		data: allCollections,
		isLoading,
		isError,
		refetch,
	} = useGetCollectionsListQuery({
		authorId: filters.isMy ? userId : filters.authorId,
		page: filters.page,
		titleOrDescriptionSearch: filters.title,
	});

	const collections = useMemo(() => {
		if (!allCollections || !allCollections.data) return undefined;
		return {
			...allCollections,
			data: allCollections.data.map((item) => ({
				...item,
				disabled: isAuthor && item.createdBy?.id !== userId,
			})),
		};
	}, [allCollections, userId, isAuthor]);

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(Collections.STUB_EMPTY_COLLECTIONS_TITLE),
			subtitle: t(Collections.STUB_EMPTY_COLLECTION_DESCRIPTION),
			buttonText: t(Collections.STUB_EMPTY_COLLECTION_BUTTON),
			onClick: () => navigate(ROUTES.admin.collections.create.page),
		},
		'filter-empty': {
			onClick: onResetAll,
		},
		error: { onClick: refetch },
	};

	return (
		<PageWrapper
			roles={['admin', 'author']}
			isLoading={isLoading}
			skeleton={<CollectionsPageSkeleton />}
			hasFilters={hasFilters}
			hasError={isError}
			hasData={(collections?.data || []).length > 0}
			stubs={stubs}
			paginationOptions={{
				page: filters.page || 1,
				onChangePage,
				limit: collections?.limit || 0,
				total: collections?.total || 0,
			}}
			content={
				<CollectionsTable
					collections={collections?.data || []}
					selectedCollections={selectedCollections}
					onSelectCollections={onSelectCollections}
				/>
			}
		>
			{({ content, pagination }) => (
				<Flex componentType="main" direction="column" gap="24">
					<SearchSection
						to="create"
						showRemoveButton={selectedCollections.length > 0}
						searchValue={filters.title}
						onSearch={onChangeTitle}
						hasFilters={hasFilters}
						renderFilter={() => (
							<CollectionsFilters
								filter={filters}
								onChangeSpecialization={onChangeSpecialization}
								onChangeIsFree={onChangeIsFree}
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

export default CollectionsPage;
