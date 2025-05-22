import { useScreenSize } from '@/shared/hooks';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Card } from '@/shared/ui/Card';

import { useGetCollectionsListQuery } from '@/entities/collection';
import { getSpecializationId } from '@/entities/profile';
import { useGetSkillsListQuery } from '@/entities/skill';

import {
	CollectionsContent,
	CollectionsFilterPanel,
	CollectionsFiltersDrawer,
	CollectionsPagination,
	useCollectionsFilters,
} from '@/widgets/Collection';

import styles from './CollectionsPage.module.css';
import { CollectionsPageSkeleton } from './CollectionsPage.skeleton';

const MAX_LIMIT_CATEGORIES = 5;

const CollectionsPage = () => {
	const {
		filter,
		resetFilters,
		onPageChange,
		onChangeSpecialization,
		onChangeSearchParams,
		onChangeIsFree,
	} = useCollectionsFilters();

	const specializationId = useAppSelector(getSpecializationId);

	const { isLoading: isLoadingCategories } = useGetSkillsListQuery({
		limit: MAX_LIMIT_CATEGORIES,
		specializations: [specializationId],
	});

	const { data: allCollections, isLoading: isLoadingAllCollections } = useGetCollectionsListQuery({
		titleOrDescriptionSearch: filter.title,
		specializations: specializationId,
		page: filter.page,
	});

	const { isLargeScreen } = useScreenSize();

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
				resetFilters={resetFilters}
				pagination={
					allCollections?.total > allCollections?.limit && (
						<CollectionsPagination
							collectionsResponse={allCollections}
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
				<Card className={styles['additional-info-wrapper']}>
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

export default CollectionsPage;
