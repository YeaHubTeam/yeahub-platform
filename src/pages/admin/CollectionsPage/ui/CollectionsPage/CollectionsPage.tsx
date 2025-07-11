import { useSelector } from 'react-redux';

import { useAppDispatch, useQueryFilter } from '@/shared/hooks';
import { SelectedAdminEntities } from '@/shared/types/types';
import { Card } from '@/shared/ui/Card';
import { EmptyStub } from '@/shared/ui/EmptyStub';
import { Flex } from '@/shared/ui/Flex';

import { useGetCollectionsListQuery } from '@/entities/collection';

import { CollectionsPagination } from '@/widgets/Collection';
import { CollectionsTable } from '@/widgets/CollectionsTable';
import { SearchSection } from '@/widgets/SearchSection';

import {
	getCollectionsSearch,
	getSelectedCollections,
} from '../../model/selectors/collectionsPageSelectors';
import { collectionsPageActions } from '../../model/slices/collectionsPageSlice';

import styles from './CollectionsPage.module.css';

/**
 * Page showing info about all the created collections
 * @constructor
 */
const CollectionsPage = () => {
	const dispatch = useAppDispatch();
	const search = useSelector(getCollectionsSearch);
	const selectedCollections = useSelector(getSelectedCollections);
	const onSelectCollections = (ids: SelectedAdminEntities) => {
		dispatch(collectionsPageActions.setSelectedCollections(ids));
	};

	const { filter, handleFilterChange, resetFilters } = useQueryFilter();
	const { page, title } = filter;

	const { data: allCollections } = useGetCollectionsListQuery({
		page,
		titleOrDescriptionSearch: search,
	});

	// in case other collections appear (eg: filtered collections)
	// as in QuestionsPage
	const collections = allCollections;
	const onPageChange = (page: number) => {
		handleFilterChange({ page });
	};

	const onChangeSearch = (value: string) => {
		dispatch(collectionsPageActions.setSearch(value));
	};

	if (!collections) {
		return null;
	}

	return (
		<Flex componentType="main" direction="column" gap="24">
			<SearchSection to="create" showRemoveButton={true} onSearch={onChangeSearch} />
			<Card className={styles.content}>
				<CollectionsTable
					collections={collections.data}
					selectedCollections={selectedCollections}
					onSelectCollections={onSelectCollections}
				/>

				{collections.total > collections.limit && (
					<CollectionsPagination
						collectionsResponse={collections}
						currentPage={filter.page || 1}
						onPageChange={onPageChange}
					/>
				)}

				{collections.data.length === 0 && <EmptyStub text={title} resetFilters={resetFilters} />}
			</Card>
		</Flex>
	);
};

export default CollectionsPage;
