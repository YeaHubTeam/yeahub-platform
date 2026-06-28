import { http, HttpResponse } from 'msw';

import { collectionsMock } from '@/entities/collection';
import { companiesMock } from '@/entities/company';
import { Question } from '@/entities/question';
import { specializationsMock } from '@/entities/specialization';
import { Task } from '@/entities/task';

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

	const currentCollection = collectionsMock.data[index];

	const updatedCollection: EditCollectionResponse = {
		id: currentCollection.id,
		title: body.title ?? currentCollection.title,
		description: body.description ?? currentCollection.description,
		isFree: body.isFree ?? currentCollection.isFree,
		imageSrc: body.collectionImage ?? currentCollection.imageSrc ?? null,
		tariff: (body.isFree ?? currentCollection.isFree) ? 'free' : 'premium',
		createdAt: currentCollection.createdAt,
		updatedAt: new Date().toISOString(),
		questionsCount: body.questions?.length ?? currentCollection.questions?.length ?? 0,
		tasksCount: body.taskIds?.length ?? currentCollection.tasks?.length ?? 0,
		specializations: body.specializations
			? body.specializations.map((id) => specializationsMock.find((spec) => spec.id === id)!)
			: currentCollection.specializations,
		keywords: body.keywords ?? currentCollection.keywords ?? [],
		company: company ?? currentCollection.company,
		createdBy: currentCollection.createdBy,
		questions: body.questions
			? body.questions.map((id) => ({ id }) as Question)
			: currentCollection.questions,
		tasks: body.taskIds ? body.taskIds.map((id) => ({ id }) as Task) : currentCollection.tasks,
	};

	collectionsMock.data[index] = updatedCollection;

	return HttpResponse.json(updatedCollection);
});
