import { http } from 'msw';

import { collectionsMock } from '@/entities/collection';

import { editCollectionApiUrls } from '../../model/constants/editCollectionConstants';

export const editCollectionMock = http.patch(
	process.env.API_URL + editCollectionApiUrls.editCollection,
	async ({ params, request }) => {
		const collectionId = Number(params.collectionId);

		const index = collectionsMock.data.findIndex((collection) => collection.id === collectionId);

		if (index === -1) {
			return new Response(null, { status: 404 });
		}

		const body = (await request.json()) as Record<string, unknown>;

		collectionsMock.data[index] = {
			...collectionsMock.data[index],
			...body,
		};

		return new Response(JSON.stringify(collectionsMock.data[index]));
	},
);
