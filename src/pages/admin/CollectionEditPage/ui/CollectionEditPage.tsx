import { useParams } from 'react-router-dom';

import { useGetCollectionByIdQuery } from '@/entities/collection';

import { CollectionEditForm } from '@/features/collections/editCollection';

const CollectionEditPage = () => {
	const { collectionId } = useParams<{ collectionId: string }>();
	const { data: collection } = useGetCollectionByIdQuery({ collectionId: collectionId! });

	if (!collection) {
		return null;
	}

	return <CollectionEditForm collection={collection} />;
};

export default CollectionEditPage;
