import { Navigate, useParams } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';

import { useGetCollectionByIdQuery } from '@/entities/collection';
import { getIsAuthor, getUserId } from '@/entities/profile';

import { CollectionEditForm } from '@/features/collections/editCollection';

const CollectionEditPage = () => {
	const { collectionId } = useParams<{ collectionId: string }>();
	const { data: collection } = useGetCollectionByIdQuery({ collectionId: collectionId! });
	const isAuthor = useAppSelector(getIsAuthor);
	const userId = useAppSelector(getUserId);

	if (!collection) {
		return null;
	}

	if (isAuthor && collection.createdBy?.id !== userId) {
		return <Navigate to={ROUTES.admin.collections.page} />;
	}

	return <CollectionEditForm collection={collection} />;
};

export default CollectionEditPage;
