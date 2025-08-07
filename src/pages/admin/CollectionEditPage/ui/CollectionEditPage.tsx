import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { useAppSelector } from '@/shared/hooks';

import { useGetCollectionByIdQuery } from '@/entities/collection';
import { getIsAuthor, getUserId } from '@/entities/profile';

import { CollectionEditForm } from '@/features/collections/editCollection';

const CollectionEditPage = () => {
	const { collectionId } = useParams<{ collectionId: string }>();
	const { data: collection } = useGetCollectionByIdQuery({ collectionId: collectionId! });
	const isAuthor = useSelector(getIsAuthor);
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
