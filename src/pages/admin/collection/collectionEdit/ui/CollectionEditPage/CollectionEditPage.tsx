import { Navigate, useParams } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';

import { useGetCollectionByIdQuery } from '@/entities/collection';
import { getIsAuthor, getUserId } from '@/entities/profile';

import { CollectionEditForm } from '@/features/collections/editCollection';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

const CollectionEditPage = () => {
	const { collectionId } = useParams<{ collectionId: string }>();
	const {
		data: collection,
		isLoading,
		isError,
		refetch,
	} = useGetCollectionByIdQuery({ collectionId: collectionId! });
	const isAuthor = useAppSelector(getIsAuthor);
	const userId = useAppSelector(getUserId);

	if (!collection) {
		return null;
	}

	if (isAuthor && collection.createdBy?.id !== userId) {
		return <Navigate to={ROUTES.admin.collections.page} />;
	}

	const stubs: PageWrapperStubs = {
		error: { onClick: refetch },
	};

	return (
		<PageWrapper
			roles={['admin', 'author']}
			isLoading={isLoading}
			hasError={isError}
			hasData={!!collection}
			stubs={stubs}
			content={collection ? <CollectionEditForm collection={collection} /> : null}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default CollectionEditPage;
