import { http, HttpResponse } from 'msw';

import { collectionsMock } from '@/entities/collection';
import { companiesMock } from '@/entities/company';
import { specializationsMock } from '@/entities/specialization';

import { editCollectionApiUrls } from '../../model/constants/editCollectionConstants';
import {
	EditCollectionBodyRequest,
	EditCollectionResponse,
} from '../../model/types/collectionEditTypes';

export const editCollectionMock = http.patch<
	{ collectionId: string },
	EditCollectionBodyRequest,
	EditCollectionResponse
>(process.env.API_URL + editCollectionApiUrls.editCollection, async ({ params, request }) => {
	const collectionId = Number(params.collectionId);

	const index = collectionsMock.data.findIndex((collection) => collection.id === collectionId);

	if (index === -1) {
		return HttpResponse.json(null, { status: 404 });
	}

	const body = await request.json();

	const currentCollection = collectionsMock.data[index];
	const companyIndex = companiesMock.data.findIndex((c) => String(c.id) === body.companyId);

	const updatedCollection: EditCollectionResponse = {
		...currentCollection,
		title: body.title ?? currentCollection.title,
		description: body.description ?? currentCollection.description,
		imageSrc: body.collectionImage ?? currentCollection.imageSrc ?? null,
		tariff: (body.isFree ?? currentCollection.isFree) ? 'free' : 'premium',
		questionsCount: body.questions?.length ?? currentCollection.questions?.length ?? 0,
		tasksCount: body.taskIds?.length ?? currentCollection.tasks?.length ?? 0,
		specializations: body.specializations
			? body.specializations.map((id) => specializationsMock.find((spec) => spec.id === id)!)
			: currentCollection.specializations,
		keywords: body.keywords ?? currentCollection.keywords ?? [],
		company: companiesMock.data[companyIndex],
		createdBy: currentCollection.createdBy,
	};

	collectionsMock.data[index] = updatedCollection;

	return HttpResponse.json(updatedCollection);
});
