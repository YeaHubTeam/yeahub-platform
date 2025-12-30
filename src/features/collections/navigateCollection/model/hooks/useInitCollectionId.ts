import { useEffect, useState } from 'react';

import { getFromLS, removeFromLS, setToLS } from '@/shared/libs';

import { Collection, LS_INIT_COLLECTION_ID } from '@/entities/collection';

export const useInitCollectionId = (collectionId: number, collections: Collection[]) => {
	const [initCollectionId, setInitCollectionId] = useState<number>(
		() => Number(getFromLS(LS_INIT_COLLECTION_ID)) ?? 0,
	);

	const currentIndex = collections.findIndex((item) => item.id === collectionId);

	useEffect(() => {
		if (!collections || !collections.length) return;

		if (currentIndex === -1 && initCollectionId === 0) {
			setToLS(LS_INIT_COLLECTION_ID, collectionId);
			setInitCollectionId(Number(collectionId));
		}
	}, [collections]);

	useEffect(() => {
		return () => {
			removeFromLS(LS_INIT_COLLECTION_ID);
		};
	}, []);

	return initCollectionId;
};
