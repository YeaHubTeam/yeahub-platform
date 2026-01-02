import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { FiltersDrawer } from '@/shared/ui/FiltersDrawer';
import { Flex } from '@/shared/ui/Flex';
import { TablePagination } from '@/shared/ui/TablePagination';

import { useGetPublicCollectionsListQuery } from '@/entities/collection';
import { DEFAULT_SPECIALIZATION_ID } from '@/entities/specialization';

import { CollectionsFilters, useCollectionsFilters } from '@/features/collection/filterCollections';

import { CollectionsContent, InterviewRecordingsBanner } from '@/widgets/Collection';

import styles from './PublicCollectionsPage.module.css';
import { PublicCollectionsPageSkeleton } from './PublicCollectionsPage.skeleton';

const PublicCollectionsPage = () => {
	const {
		filters,
		hasFilters,
		onResetFilters,
		onChangePage,
		onChangeSpecialization,
		onChangeCompany,
		onChangeIsFree,
		onChangeTitle,
		onChangeKeyword,
	} = useCollectionsFilters({ page: 1, specialization: DEFAULT_SPECIALIZATION_ID });
	const { isLargeScreen } = useScreenSize();
	const { data: collections, isLoading: isLoadingCollections } = useGetPublicCollectionsListQuery({
		titleOrDescriptionSearch: filters.title,
		specializations: filters.specialization,
		companies: filters.company,
		isFree: filters.isFree,
		page: filters.page,
		keywords: filters.keyword ? [filters.keyword] : undefined,
	});

	const renderFilter = () => (
		<CollectionsFilters
			onChangeTitle={onChangeTitle}
			onChangeSpecialization={onChangeSpecialization}
			onChangeCompany={onChangeCompany}
			onChangeIsFree={onChangeIsFree}
			onChangeKeyword={onChangeKeyword}
			filter={{
				title: filters.title,
				specialization: filters.specialization,
				isFree: filters.isFree,
				keyword: filters.keyword,
				company: filters.company,
			}}
		/>
	);
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
				filter={filters}
				hasFilters={hasFilters}
				resetFilters={onResetFilters}
				pagination={
					<TablePagination
						page={filters.page || 1}
						onChangePage={onChangePage}
						limit={collections.limit}
						total={collections.total}
					/>
				}
				renderDrawer={() => <FiltersDrawer>{renderFilter()}</FiltersDrawer>}
				banner={!isLargeScreen && <InterviewRecordingsBanner />}
			/>
			<Flex direction="column" gap="20">
				{isLargeScreen && <Card className={styles.filters}>{renderFilter()}</Card>}
				{isLargeScreen && <InterviewRecordingsBanner />}
			</Flex>
		</section>
	);
};

export default PublicCollectionsPage;
