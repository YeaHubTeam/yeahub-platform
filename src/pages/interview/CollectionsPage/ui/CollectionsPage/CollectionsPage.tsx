import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useQueryFilter } from '@/shared/hooks/useQueryFilter';
import { Card } from '@/shared/ui/Card';
import { EmptyStub } from '@/shared/ui/EmptyStub';

import { useGetCollectionsListQuery } from '@/entities/collection';
import { getSpecializationId } from '@/entities/profile';
import { useGetSkillsListQuery } from '@/entities/skill';

import { CollectionsFilterPanel, CollectionsList } from '@/widgets/Collection';

import { CollectionPagePagination } from '@/pages/interview/CollectionsPage/ui/CollectionsPagePagination/CollectionPagePagination';

import styles from './CollectionsPage.module.css';
import { CollectionsPageSkeleton } from './CollectionsPage.skeleton';

const MAX_LIMIT_CATEGORIES = 5;

const CollectionsPage = () => {
	const { filter, handleFilterChange, resetFilters } = useQueryFilter();

	const specializationId = useAppSelector(getSpecializationId);

	const { isLoading: isLoadingCategories } = useGetSkillsListQuery({
		limit: MAX_LIMIT_CATEGORIES,
		specializations: [specializationId],
	});

	const { data: allCollections, isLoading: isLoadingAllCollections } = useGetCollectionsListQuery({
		...filter,
	});

	const onChangeSearchParams = (value: string) => {
		handleFilterChange({ title: value });
	};

	const onChangeSpecialization = (specialization: number | number[]) => {
		handleFilterChange({
			specialization: Array.isArray(specialization) ? specialization : [specialization],
			page: 1,
		});
	};

	const onChangeIsFree = (isFree: boolean) => {
		handleFilterChange({ isFree: isFree, page: 1 });
	};

	const onPageChange = (page: number) => {
		handleFilterChange({ page });
	};

	if (isLoadingAllCollections || isLoadingCategories) {
		return <CollectionsPageSkeleton />;
	}

	if (!allCollections) {
		return null;
	}

	return (
		<section className={styles.wrapper}>
			<div className={styles['main-info-wrapper']}>
				<Card className={styles.content}>
					<CollectionsList collections={allCollections.data} />

					{allCollections.total > allCollections.limit && (
						<CollectionPagePagination
							collectionsResponse={allCollections}
							currentPage={filter.page || 1}
							onPageChange={onPageChange}
						/>
					)}

					{allCollections.data.length === 0 && (
						<EmptyStub text={filter.title} resetFilters={resetFilters} />
					)}
				</Card>
			</div>

			<div className={styles['additional-info-wrapper']}>
				<Card className={styles.search}>
					<CollectionsFilterPanel
						onChangeSearch={onChangeSearchParams}
						onChangeSpecialization={onChangeSpecialization}
						onChangeIsFree={onChangeIsFree}
						filter={{
							title: filter.title,
							specialization: filter.specialization,
							tariff: filter.isFree,
						}}
					/>
				</Card>
			</div>
		</section>
	);
};

export default CollectionsPage;
