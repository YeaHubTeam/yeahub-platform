import { http, HttpResponse } from 'msw';

import { collectionsMock } from '@/entities/collection';
import { companiesMock } from '@/entities/company';
import { Question } from '@/entities/question';
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

	const body = (await request.json()) as EditCollectionBodyRequest;
	const company = body.companyId
		? companiesMock.data.find((c) => String(c.id) === body.companyId)
		: collectionsMock.data[index].company;

	if (body.companyId && !company) {
		return new HttpResponse(null, { status: 404 });
	}

	collectionsMock.data[index] = {
		...collectionsMock.data[index],
		...body,
		company: company || collectionsMock.data[index].company,
		specializations: body.specializations
			? body.specializations.map((id) => specializationsMock.find((spec) => spec.id === id)!)
			: collectionsMock.data[index].specializations,
		questions: body.questions
			? body.questions.map((id) => ({ id }) as Question)
			: collectionsMock.data[index].questions,
		updatedAt: new Date().toISOString(),
	};

	return HttpResponse.json(collectionsMock.data[index]);
});
