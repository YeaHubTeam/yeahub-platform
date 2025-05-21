import { useGetPublicCollectionsListQuery } from '@/entities/collection';

import {
	CollectionsContent,
	CollectionsFilters,
	CollectionsPagination,
	useCollectionsFilters,
} from '@/widgets/Collection';

import { PublicCollectionsPageSkeleton } from '@/pages/landing/PublicCollectionsPage/ui/PublicCollectionsPage.skeleton';

import styles from './PublicCollectionsPage.module.css';

const COLLECTIONS_PER_PAGE = 6;

const PublicCollectionsPage = () => {
	const {
		filter,
		resetFilters,
		onPageChange,
		onChangeSpecialization,
		onChangeSearchParams,
		onChangeIsFree,
	} = useCollectionsFilters();

	const { data: collections, isLoading: isLoadingCollections } = useGetPublicCollectionsListQuery({
		titleOrDescriptionSearch: filter.title,
		specializations: filter.specialization,
		page: filter.page,
		limit: COLLECTIONS_PER_PAGE,
	});

	if (isLoadingCollections) {
		return <PublicCollectionsPageSkeleton />;
	}

	if (!collections) {
		return null;
	}

	return (
		<section className={styles.wrapper}>
			<CollectionsContent
				collections={collections.data}
				filter={filter}
				resetFilters={resetFilters}
				pagination={
					collections?.total > collections.limit && (
						<CollectionsPagination
							collectionsResponse={collections}
							currentPage={filter.page || 1}
							onPageChange={onPageChange}
						/>
					)
				}
			/>
			<CollectionsFilters
				onChangeSearch={onChangeSearchParams}
				onChangeSpecialization={onChangeSpecialization}
				onChangeIsFree={onChangeIsFree}
				filter={filter}
				isPublicCollections
			/>
		</section>
	);
};

export default PublicCollectionsPage;
