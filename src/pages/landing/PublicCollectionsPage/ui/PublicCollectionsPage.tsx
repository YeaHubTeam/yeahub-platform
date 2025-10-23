import { useMemo } from 'react';

import { useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { FiltersDrawer } from '@/shared/ui/FiltersDrawer';

import { useGetPublicCollectionsListQuery } from '@/entities/collection';
import { DEFAULT_SPECIALIZATION_ID } from '@/entities/specialization';

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
		onResetFilters,
		onChangePage,
		onChangeSpecialization,
		onChangeSearchParams,
		// onChangeIsFree,
	} = useCollectionsFilters({ page: 1, specialization: DEFAULT_SPECIALIZATION_ID });

	const { data: collections, isLoading: isLoadingCollections } = useGetPublicCollectionsListQuery({
		titleOrDescriptionSearch: filter.title,
		specializations: filter.specialization,
		page: filter.page,
		limit: COLLECTIONS_PER_PAGE,
	});

	const renderFilter = useMemo(
		() => (
			<CollectionsFilters
				onChangeSearch={onChangeSearchParams}
				onChangeSpecialization={onChangeSpecialization}
				// onChangeIsFree={onChangeIsFree}
				filter={{
					title: filter.title,
					specialization: filter.specialization,
					// isFree: filter.isFree,
				}}
			/>
		),
		[filter, onChangeSearchParams, onChangeSpecialization],
	);

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
				resetFilters={onResetFilters}
				pagination={
					collections?.total > collections.limit && (
						<CollectionsPagination
							collectionsResponse={collections}
							currentPage={filter.page || 1}
							onPageChange={onChangePage}
						/>
					)
				}
				renderDrawer={() => <FiltersDrawer>{renderFilter}</FiltersDrawer>}
			/>
			{isLargeScreen && <Card className={styles.filters}>{renderFilter}</Card>}
		</section>
	);
};

export default PublicCollectionsPage;
