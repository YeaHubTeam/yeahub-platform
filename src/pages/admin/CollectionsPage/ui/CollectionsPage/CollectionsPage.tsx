import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useQueryFilter } from '@/shared/hooks/useQueryFilter';
import { SelectedAdminEntities } from '@/shared/types/types';
import { Card } from '@/shared/ui/Card';
import { EmptyStub } from '@/shared/ui/EmptyStub';
import { Flex } from '@/shared/ui/Flex';

import { useGetCollectionsListQuery } from '@/entities/collection';

import { CollectionsTable } from '@/widgets/CollectionsTable';
import { SearchSection } from '@/widgets/SearchSection';

import { getSelectedCollections } from '../../model/selectors/collectionsPageSelectors';
import { collectionsPageActions } from '../../model/slices/collectionsPageSlice';
import { CollectionsPagePagination } from '../CollectionsPagePagination/CollectionsPagePagination';

import styles from './CollectionsPage.module.css';

/**
 * Page showing info about all the created collections
 * @constructor
 */
const CollectionsPage = () => {
	const dispatch = useAppDispatch();
	const selectedCollections = useSelector(getSelectedCollections);
	const onSelectCollections = (ids: SelectedAdminEntities) => {
		dispatch(collectionsPageActions.setSelectedCollections(ids));
	};

	const { filter, handleFilterChange, resetFilters } = useQueryFilter();
	const { page, titleOrDescriptionSearch } = filter;

	const { data: allCollections, isLoading: isLoadingAllCollections } = useGetCollectionsListQuery({
		page,
	});

	// in case other collections appear (eg: filtered collections)
	// as in QuestionsPage
	const collections = allCollections;

	const onPageChange = (page: number) => {
		handleFilterChange({ page });
	};

	if (isLoadingAllCollections) {
		return 'TODO SKELETON PAGE';
	}

	if (!collections) {
		return null;
	}

	return (
		<Flex componentType="main" direction="column" gap="24">
			<SearchSection to="create" showRemoveButton={true} />
			<Card className={styles.content}>
				<CollectionsTable
					collections={collections.data}
					selectedCollections={selectedCollections}
					onSelectCollections={onSelectCollections}
				/>

				{collections.total > collections.limit && (
					<CollectionsPagePagination
						collectionsResponse={collections}
						currentPage={filter.page || 1}
						onPageChange={onPageChange}
					/>
				)}

				{collections.data.length === 0 && (
					<EmptyStub text={titleOrDescriptionSearch} resetFilters={resetFilters} />
				)}
			</Card>
		</Flex>
	);
};

export default CollectionsPage;
