import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { Collections, i18Namespace } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';

import { useGetCollectionsListQuery } from '@/entities/collection';
import { getSpecializationId } from '@/entities/profile';
import { MAX_SHOW_LIMIT_SKILLS, useGetSkillsListQuery } from '@/entities/skill';

import {
	CollectionsFilters,
	useCollectionsFilters,
} from '@/features/collections/filterCollections';

import { CollectionsList, InterviewRecordingsBanner } from '@/widgets/Collection';
import { ListLayoutPage } from '@/widgets/ListLayoutPage';
import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import { CollectionsPageSkeleton } from './CollectionsPage.skeleton';

const CollectionsPage = () => {
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
			title: t(Collections.STUB_EMPTY_COLLECTIONS_TITLE),
			subtitle: t(Collections.STUB_EMPTY_COLLECTIONS_SUBTITLE),
		},
		'filter-empty': {
			onClick: onResetFilters,
		},
		error: {
			onClick: refetchCollections,
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
				<ListLayoutPage
					title={t(Collections.COLLECTIONS_TITLE)}
					filters={renderFilters()}
					pagination={pagination}
					secondaryContent={<InterviewRecordingsBanner />}
				>
					{content}
				</ListLayoutPage>
			)}
		</PageWrapper>
	);
};

export default CollectionsPage;
