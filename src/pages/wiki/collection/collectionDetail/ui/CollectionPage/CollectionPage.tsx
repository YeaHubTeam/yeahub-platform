import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { i18Namespace, Collections } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';

import { useGetCollectionByIdQuery } from '@/entities/collection';
import { getHasPremiumAccess, getProfileId } from '@/entities/profile';
import { useGetQuestionsListQuery } from '@/entities/question';

import { useGetCollectionsFilterParams } from '@/features/collections/filterCollections';
import {
	useCollectionQueryNavigate,
	useCollectionNavigation,
} from '@/features/collections/navigateCollection';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import { CollectionContent } from './CollectionContent';
import { CollectionPageSkeleton } from './CollectionPage.skeleton';

export const CollectionPage = () => {
	const { t } = useTranslation(i18Namespace.collection);
	const filter = useGetCollectionsFilterParams({
		page: 1,
	});
	const { collectionId = '' } = useParams<{ collectionId: string }>();
	const {
		data: collection,
		isFetching,
		isLoading,
		isError: isCollectionError,
		refetch: refetchCollection,
	} = useGetCollectionByIdQuery({ collectionId });
	const hasPremiumAccess = useAppSelector(getHasPremiumAccess);
	const profileId = useAppSelector(getProfileId);
	const { data: response } = useGetQuestionsListQuery(
		{
			collection: Number(collectionId),
			profileId,
			limit: collection?.questionsCount,
		},
		{ skip: !collection?.questionsCount },
	);
	const { onQueryNavigate } = useCollectionQueryNavigate();
	const { prevId, nextId, prevPage, nextPage, isDisabled } = useCollectionNavigation({
		collectionId,
		filter,
	});

	const questions = response?.data ?? [];

	const isCollectionEmpty =
		!collection || Object.keys(collection).length === 0 || collection.questionsCount === 0;

	const onMovePrev = () => {
		onQueryNavigate(prevId, prevPage);
	};
	const onMoveNext = () => {
		onQueryNavigate(nextId, nextPage);
	};

	const renderContent = () => {
		if (!collection) return null;
		return (
			<CollectionContent
				collection={collection}
				collectionId={collectionId}
				questions={questions}
				hasPremiumAccess={hasPremiumAccess}
				profileId={profileId}
				onMovePrev={onMovePrev}
				onMoveNext={onMoveNext}
				isDisabled={isDisabled}
			/>
		);
	};

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(Collections.STUB_EMPTY_COLLECTION_TITLE),
			subtitle: t(Collections.STUB_EMPTY_COLLECTION_SUBTITLE),
			buttonText: t(Collections.STUB_EMPTY_COLLECTION_SUBMIT),
			onClick: refetchCollection,
		},
		error: {
			onClick: refetchCollection,
		},
	};

	return (
		<PageWrapper
			isLoading={isLoading || isFetching}
			skeleton={<CollectionPageSkeleton />}
			hasData={!isCollectionEmpty}
			hasError={isCollectionError}
			hasFilters={false}
			stubs={stubs}
			content={renderContent()}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};
