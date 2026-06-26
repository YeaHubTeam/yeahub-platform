import { http } from 'msw';

import { collectionsMock } from '@/entities/collection';

import { deleteCollectionApiUrls } from '../../model/constants/deleteCollectionConstants';

export const deleteCollectionMock = http.delete(
	process.env.API_URL + deleteCollectionApiUrls.deleteCollection,
	({ params }) => {
		const collectionId = Number(params.collectionId);

		const index = collectionsMock.data.findIndex((collection) => collection.id === collectionId);

		if (index !== 1) {
			collectionsMock.data.splice(index, 1);
		}

		return new Response();
	},
);
