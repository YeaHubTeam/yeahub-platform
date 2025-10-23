import { useMemo } from 'react';

import { useScreenSize } from '@/shared/hooks';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Card } from '@/shared/ui/Card';
import { FiltersDrawer } from '@/shared/ui/FiltersDrawer';

import { useGetCollectionsListQuery } from '@/entities/collection';
import { getSpecializationId } from '@/entities/profile';
import { MAX_SHOW_LIMIT_SKILLS, useGetSkillsListQuery } from '@/entities/skill';

import {
	CollectionsContent,
	CollectionsFilters,
	CollectionsPagination,
	useCollectionsFilters,
} from '@/widgets/Collection';

import styles from './CollectionsPage.module.css';
import { CollectionsPageSkeleton } from './CollectionsPage.skeleton';

const CollectionsPage = () => {
	const {
		filter,
		onResetFilters,
		onChangePage,
		onChangeSearchParams,
		// onChangeIsFree,
	} = useCollectionsFilters({ page: 1 });

	const specializationId = useAppSelector(getSpecializationId);

	const { isLoading: isLoadingCategories } = useGetSkillsListQuery({
		limit: MAX_SHOW_LIMIT_SKILLS,
		specializations: [specializationId],
	});

	const { data: allCollections, isLoading: isLoadingAllCollections } = useGetCollectionsListQuery({
		titleOrDescriptionSearch: filter.title,
		specializations: specializationId,
		page: filter.page,
	});

	const { isLargeScreen } = useScreenSize();

	const renderFilters = useMemo(
		() => (
			<CollectionsFilters
				onChangeSearch={onChangeSearchParams}
				// onChangeIsFree={onChangeIsFree}
				filter={{
					title: filter.title,
					isFree: filter.isFree,
				}}
			/>
		),
		[filter, onChangeSearchParams],
	);

	if (isLoadingAllCollections || isLoadingCategories) {
		return <CollectionsPageSkeleton />;
	}

	if (!allCollections) {
		return null;
	}

	return (
		<section className={styles.wrapper}>
			<CollectionsContent
				collections={allCollections.data}
				filter={filter}
				resetFilters={onResetFilters}
				pagination={
					allCollections?.total > allCollections?.limit && (
						<CollectionsPagination
							collectionsResponse={allCollections}
							currentPage={filter.page || 1}
							onPageChange={onChangePage}
						/>
					)
				}
				renderDrawer={() => <FiltersDrawer>{renderFilters}</FiltersDrawer>}
			/>
			{isLargeScreen && <Card className={styles.filters}>{renderFilters}</Card>}
		</section>
	);
};

export default CollectionsPage;
