import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { Collections, i18Namespace } from '@/shared/config';
import { useScreenSize, useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { FiltersDrawer } from '@/shared/ui/FiltersDrawer';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { useGetCollectionsListQuery } from '@/entities/collection';
import { getSpecializationId } from '@/entities/profile';
import { MAX_SHOW_LIMIT_SKILLS, useGetSkillsListQuery } from '@/entities/skill';

import {
	CollectionsFilters,
	useCollectionsFilters,
} from '@/features/collections/filterCollections';

import { CollectionsList, InterviewRecordingsBanner } from '@/widgets/Collection';
import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import styles from './CollectionsPage.module.css';
import { CollectionsPageSkeleton } from './CollectionsPage.skeleton';

const CollectionsPage = () => {
	const { isSmallScreen } = useScreenSize();
	const { t } = useTranslation(i18Namespace.collection);
	const { search } = useLocation();

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

	const {
		data: allCollections,
		isLoading: isLoadingAllCollections,
		isError: isErrorAllCollections,
		refetch: refetchCollections,
	} = useGetCollectionsListQuery({
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

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(Collections.STUB_EMPTY_TITLE),
			subtitle: t(Collections.STUB_EMPTY_SUBTITLE),
		},
		'filter-empty': {
			onClick: onResetFilters,
		},
		error: {
			onClick: () => refetchCollections(),
		},
	};

	return (
		<PageWrapper
			isLoading={isLoadingAllCollections || isLoadingCategories}
			skeleton={<CollectionsPageSkeleton />}
			hasFilters={hasFilters}
			hasData={(allCollections?.data || []).length > 0}
			hasError={isErrorAllCollections}
			stubs={stubs}
			content={<CollectionsList collections={allCollections?.data || []} queryFilter={search} />}
			paginationOptions={{
				page: filters.page || 1,
				onChangePage,
				limit: allCollections?.limit || 0,
				total: allCollections?.total || 0,
			}}
		>
			{({ content, pagination }) => (
				<section className={styles.wrapper}>
					<div className={styles['main-info-wrapper']}>
						<Card className={styles.content}>
							<Flex className={styles.header} direction="row" justify="between">
								<Text variant="body6" isMainTitle maxRows={1}>
									{t(Collections.COLLECTIONS_TITLE)}
								</Text>
								{isSmallScreen && <FiltersDrawer>{renderFilters()}</FiltersDrawer>}
							</Flex>
							<>
								{content}
								{!isLargeScreen && <InterviewRecordingsBanner />}
								{pagination}
							</>
						</Card>
					</div>
					<Flex direction="column" gap="20">
						{isLargeScreen && <Card className={styles.filters}>{renderFilters()}</Card>}
						{isLargeScreen && <InterviewRecordingsBanner />}
					</Flex>
				</section>
			)}
		</PageWrapper>
	);
};

export default CollectionsPage;
