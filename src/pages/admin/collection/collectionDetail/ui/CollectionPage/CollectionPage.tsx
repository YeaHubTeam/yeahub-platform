import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Collections, i18Namespace } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';

import { useGetCollectionByIdQuery } from '@/entities/collection';
import { getIsAuthor, getProfileId, getUserId } from '@/entities/profile';
import { useGetQuestionsListQuery } from '@/entities/question';
import { useGetTasksListQuery } from '@/entities/task';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import { CollectionPageContent } from '../CollectionPageContent/CollectionPageContent';
import { CollectionPageContentSkeleton } from '../CollectionPageContent/CollectionPageContent.skeleton';

export const CollectionPage = () => {
	const { t } = useTranslation(i18Namespace.translation);
	const { collectionId } = useParams<{ collectionId: string }>();
	const {
		data: collection,
		isFetching,
		isLoading,
		isError: isCollectionError,
	} = useGetCollectionByIdQuery({ collectionId });
	const { data: tasksResponse } = useGetTasksListQuery(
		{
			collectionId: collectionId ? Number(collectionId) : undefined,
			limit: 50,
			page: 1,
		},
		{
			skip: !collectionId,
		},
	);
	const tasks = tasksResponse?.data ?? [];
	const isAuthor = useSelector(getIsAuthor);
	const profileId = useAppSelector(getProfileId);
	const userId = useAppSelector(getUserId);
	const {
		data: response,
		isError: isQuestionsError,
		refetch,
	} = useGetQuestionsListQuery(
		{
			collection: Number(collectionId),
			profileId,
			limit: collection?.questionsCount,
		},
		{ skip: collection?.questionsCount === undefined },
	);

	const questions = response?.data ?? [];

	const hasCollection = !!collection && Object.keys(collection).length > 0;
	const isCollectionLoading = isLoading || isFetching;

	const hasData = hasCollection;

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(Collections.STUB_EMPTY_COLLECTION_TITLE),
			subtitle: t(Collections.STUB_EMPTY_COLLECTION_SUBTITLE),
			buttonText: t(Collections.STUB_EMPTY_COLLECTION_SUBMIT),
			onClick: () => refetch(),
		},
		error: { onClick: () => refetch() },
	};

	const isDisabled = isAuthor && collection?.createdBy?.id !== userId;

	const content = hasCollection ? (
		<CollectionPageContent
			collection={collection}
			questions={questions}
			tasks={tasks}
			isDisabled={isDisabled}
			isLoading={isCollectionLoading}
		/>
	) : null;

	return (
		<PageWrapper
			roles={['admin', 'author']}
			isLoading={isCollectionLoading}
			hasError={isCollectionError || isQuestionsError}
			hasData={hasData}
			stubs={stubs}
			skeleton={<CollectionPageContentSkeleton />}
			content={content}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};
