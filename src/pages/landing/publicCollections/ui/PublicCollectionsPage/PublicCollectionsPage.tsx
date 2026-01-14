import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { Collections, i18Namespace } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { FiltersDrawer } from '@/shared/ui/FiltersDrawer';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { useGetPublicCollectionsListQuery } from '@/entities/collection';
import { DEFAULT_SPECIALIZATION_ID } from '@/entities/specialization';

import {
	CollectionsFilters,
	useCollectionsFilters,
} from '@/features/collections/filterCollections';

import { CollectionsList, InterviewRecordingsBanner } from '@/widgets/Collection';
import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import styles from './PublicCollectionsPage.module.css';
import { PublicCollectionsPageSkeleton } from './PublicCollectionsPage.skeleton';

const PublicCollectionsPage = () => {
	const { isSmallScreen } = useScreenSize();
	const { t } = useTranslation(i18Namespace.collection);
	const { search } = useLocation();

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

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(Collections.STUB_EMPTY_TITLE),
			subtitle: t(Collections.STUB_EMPTY_SUBTITLE),
		},
		'filter-empty': {
			onClick: onResetFilters,
		},
	};

	return (
		<PageWrapper
			isLoading={isLoadingCollections}
			skeleton={<PublicCollectionsPageSkeleton />}
			hasFilters={hasFilters}
			hasData={(collections?.data || []).length > 0}
			stubs={stubs}
			content={<CollectionsList collections={collections?.data || []} queryFilter={search} />}
			paginationOptions={{
				page: filters.page || 1,
				onChangePage,
				limit: collections?.limit || 0,
				total: collections?.total || 0,
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
								{isSmallScreen && <FiltersDrawer>{renderFilter()}</FiltersDrawer>}
							</Flex>
							<>
								{content}
								{!isLargeScreen && <InterviewRecordingsBanner />}
								{pagination}
							</>
						</Card>
					</div>
					<Flex direction="column" gap="20">
						{isLargeScreen && <Card className={styles.filters}>{renderFilter()}</Card>}
						{isLargeScreen && <InterviewRecordingsBanner />}
					</Flex>
				</section>
			)}
		</PageWrapper>
	);
};

export default PublicCollectionsPage;
