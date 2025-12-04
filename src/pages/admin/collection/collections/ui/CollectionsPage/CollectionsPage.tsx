import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch, SelectedAdminEntities } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { EmptyFilterStub } from '@/shared/ui/EmptyFilterStub';
import { Flex } from '@/shared/ui/Flex';
import { TablePagination } from '@/shared/ui/TablePagination';

import { useGetCollectionsListQuery } from '@/entities/collection';
import { getIsAuthor, getUserId } from '@/entities/profile';
import { UserSelect } from '@/entities/user';

import { useCollectionsFilters } from '@/features/collections/filterCollections';

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

	const { filters, hasFilters, onResetFilters, onChangeTitle, onChangePage, onChangeAuthor } =
		useCollectionsFilters({
			page: 1,
		});

	const onResetAll = () => {
		dispatch(collectionsPageActions.resetFilters());
		onResetFilters();
	};

	const { data: allCollections } = useGetCollectionsListQuery({
		authorId: filters.authorId,
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
				renderFilter={() => <UserSelect value={filters.authorId} onChange={onChangeAuthor} />}
			/>
			<Card className={styles.content}>
				<CollectionsTable
					collections={collections.data}
					selectedCollections={selectedCollections}
					onSelectCollections={onSelectCollections}
				/>
				<TablePagination
					page={filters.page || 1}
					onChangePage={onChangePage}
					limit={collections.limit}
					total={collections.total}
				/>
				{collections.data.length === 0 && (
					<EmptyFilterStub text={filters.title} resetFilters={onResetAll} />
				)}
			</Card>
		</Flex>
	);
};

export default CollectionsPage;
