import { http, HttpResponse, PathParams } from 'msw';

import { collectionsMock } from '@/entities/collection';

import { editCollectionApiUrls } from '../../model/constants/editCollectionConstants';
import { EditCollectionResponse } from '../../model/types/collectionEditTypes';

export const editCollectionApiMock = http.patch<
	PathParams,
	EditCollectionResponse,
	EditCollectionResponse | { error: string }
>(process.env.API_URL + editCollectionApiUrls.editCollection, async ({ request }) => {
	const formData = await request.json();

	const collectionId = collectionsMock.data.findIndex(
		(collection) => collection.id === formData.id,
	);
	if (collectionId !== -1) {
		const updateCollection = {
			...collectionsMock.data[collectionId],
			...formData,
			updatedAt: new Date().toISOString(),
		};
		collectionsMock.data[collectionId] = updateCollection;
		return HttpResponse.json(updateCollection);
	}
	return HttpResponse.json({ error: 'Collection not found' }, { status: 404 });
});
