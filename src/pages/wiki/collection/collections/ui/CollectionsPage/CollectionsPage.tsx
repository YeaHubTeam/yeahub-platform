import { useScreenSize, useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { FiltersDrawer } from '@/shared/ui/FiltersDrawer';
import { Flex } from '@/shared/ui/Flex';
import { TablePagination } from '@/shared/ui/TablePagination';

import { useGetCollectionsListQuery } from '@/entities/collection';
import { getSpecializationId } from '@/entities/profile';
import { MAX_SHOW_LIMIT_SKILLS, useGetSkillsListQuery } from '@/entities/skill';

import {
	CollectionsFilters,
	useCollectionsFilters,
} from '@/features/collections/filterCollections';

import { CollectionsContent, InterviewRecordingsBanner } from '@/widgets/Collection';

import styles from './CollectionsPage.module.css';
import { CollectionsPageSkeleton } from './CollectionsPage.skeleton';

const CollectionsPage = () => {
	const {
		filters,
		hasFilters,
		onResetFilters,
		onChangePage,
		onChangeTitle,
		onChangeIsFree,
		onChangeKeyword,
		onChangeCompany,
	} = useCollectionsFilters({
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
		companies: filters.company,
		isFree: filters.isFree,
		page: filters.page,
		keywords: filters.keyword ? [filters.keyword] : undefined,
	});

	const { isLargeScreen } = useScreenSize();

	const renderFilters = () => (
		<CollectionsFilters
			onChangeTitle={onChangeTitle}
			onChangeIsFree={onChangeIsFree}
			onChangeCompany={onChangeCompany}
			onChangeKeyword={onChangeKeyword}
			filter={{
				title: filters.title,
				isFree: filters.isFree,
				company: filters.company,
				keyword: filters.keyword,
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
				hasFilters={hasFilters}
				resetFilters={onResetFilters}
				pagination={
					<TablePagination
						page={filters.page || 1}
						onChangePage={onChangePage}
						limit={allCollections.limit}
						total={allCollections.total}
					/>
				}
				renderDrawer={() => <FiltersDrawer>{renderFilters()}</FiltersDrawer>}
				banner={!isLargeScreen && <InterviewRecordingsBanner />}
			/>
			<Flex direction="column" gap="20">
				{isLargeScreen && <Card className={styles.filters}>{renderFilters()}</Card>}
				{isLargeScreen && <InterviewRecordingsBanner />}
			</Flex>
		</section>
	);
};

export default CollectionsPage;
