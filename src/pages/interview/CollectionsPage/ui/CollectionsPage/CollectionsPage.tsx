import { useAppSelector } from '@/shared/hooks/useAppSelector';

import { useGetCollectionsListQuery } from '@/entities/collection';
import { getSpecializationId } from '@/entities/profile';
import { useGetSkillsListQuery } from '@/entities/skill';

import {
	CollectionsContent,
	CollectionsFilters,
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
			/>
			<CollectionsFilters
				onChangeSearch={onChangeSearchParams}
				onChangeSpecialization={onChangeSpecialization}
				onChangeIsFree={onChangeIsFree}
				filter={filter}
			/>
		</section>
	);
};

export default CollectionsPage;
