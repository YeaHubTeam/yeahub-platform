import { collectionsMock } from '@/entities/collection';

import { CollectionEditForm } from '@/features/collections/editCollection';

const CollectionEditPage = () => {
	// const { questionId } = useParams<{ questionId: string }>();
	// const profileId = useAppSelector(getProfileId);

	const collection = collectionsMock[0];

	if (!collection) {
		return null;
	}

	return <CollectionEditForm collection={collection} />;
};

export default CollectionEditPage;
