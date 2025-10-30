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
	const { filters, onResetFilters, onChangePage, onChangeTitle } = useCollectionsFilters({
		page: 1,
	});

	const specializationId = useAppSelector(getSpecializationId);

	const { isLoading: isLoadingCategories } = useGetSkillsListQuery({
		limit: MAX_SHOW_LIMIT_SKILLS,
		specializations: [specializationId],
	});

	const { data: allCollections, isLoading: isLoadingAllCollections } = useGetCollectionsListQuery({
		titleOrDescriptionSearch: filters.title,
		specializations: specializationId,
		page: filters.page,
	});

	const { isLargeScreen } = useScreenSize();

	const renderFilters = () => (
		<CollectionsFilters
			onChangeTitle={onChangeTitle}
			filter={{
				title: filters.title,
			}}
		/>
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
				filter={filters}
				resetFilters={onResetFilters}
				pagination={
					allCollections?.total > allCollections?.limit && (
						<CollectionsPagination
							collectionsResponse={allCollections}
							currentPage={filters.page || 1}
							onPageChange={onChangePage}
						/>
					)
				}
				renderDrawer={() => <FiltersDrawer>{renderFilters()}</FiltersDrawer>}
			/>
			{isLargeScreen && <Card className={styles.filters}>{renderFilters()}</Card>}
		</section>
	);
};

export default CollectionsPage;
