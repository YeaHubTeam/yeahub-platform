import { useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';

import { useGetPublicCollectionsListQuery } from '@/entities/collection';

import {
	CollectionsContent,
	CollectionsFilterPanel,
	CollectionsFiltersDrawer,
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

	const { isLargeScreen } = useScreenSize();

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
				renderDrawer={() => (
					<CollectionsFiltersDrawer
						onChangeSearch={onChangeSearchParams}
						onChangeSpecialization={onChangeSpecialization}
						onChangeIsFree={onChangeIsFree}
						filter={{
							title: filter.title,
							specialization: filter.specialization,
							isFree: filter.isFree,
						}}
					/>
				)}
			/>
			{isLargeScreen && (
				<Card className={styles.filters}>
					<CollectionsFilterPanel
						onChangeSearch={onChangeSearchParams}
						onChangeSpecialization={onChangeSpecialization}
						onChangeIsFree={onChangeIsFree}
						filter={{
							title: filter.title,
							specialization: filter.specialization,
							isFree: filter.isFree,
						}}
					/>
				</Card>
			)}
		</section>
	);
};

export default PublicCollectionsPage;
