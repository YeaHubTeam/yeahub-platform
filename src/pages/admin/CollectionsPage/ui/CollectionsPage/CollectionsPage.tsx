import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks';
import { SelectedAdminEntities } from '@/shared/types/types';
import { Card } from '@/shared/ui/Card';
import { EmptyFilterStub } from '@/shared/ui/EmptyFilterStub';
import { Flex } from '@/shared/ui/Flex';

import { useGetCollectionsListQuery } from '@/entities/collection';
import { getIsAuthor, getUserId } from '@/entities/profile';

import {
	CollectionsFilters,
	useCollectionsFilters,
} from '@/features/collections/filterCollections';

import { CollectionsPagination } from '@/widgets/Collection';
import { CollectionsTable } from '@/widgets/CollectionsTable';
import { SearchSection } from '@/widgets/SearchSection';

import { getSelectedCollections } from '../../model/selectors/collectionsPageSelectors';
import { collectionsPageActions } from '../../model/slices/collectionsPageSlice';

import styles from './CollectionsPage.module.css';

const CollectionsPage = () => {
	const dispatch = useAppDispatch();
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

	const { data: allCollections } = useGetCollectionsListQuery({
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

	if (!collections) {
		return null;
	}

	return (
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
						onChangeTitle={onChangeTitle}
						onChangeSpecialization={onChangeSpecialization}
						onChangeIsFree={onChangeIsFree}
						onChangeIsMy={onChangeIsMy}
					/>
				)}
			/>
			<Card className={styles.content}>
				<CollectionsTable
					collections={collections.data}
					selectedCollections={selectedCollections}
					onSelectCollections={onSelectCollections}
				/>

				{collections.total > collections.limit && (
					<CollectionsPagination
						collectionsResponse={collections}
						currentPage={filters.page || 1}
						onPageChange={onChangePage}
					/>
				)}

				{collections.data.length === 0 && (
					<EmptyFilterStub text={filters.title} resetFilters={onResetAll} />
				)}
			</Card>
		</Flex>
	);
};

export default CollectionsPage;
