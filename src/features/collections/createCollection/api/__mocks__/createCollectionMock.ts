import { http, HttpResponse } from 'msw';

import { collectionsMock } from '@/entities/collection';
import { companiesMock } from '@/entities/company';
import { specializationsMock } from '@/entities/specialization';

import { createCollectionApiUrls } from '../../model/constants/createCollectionConstants';
import {
	CreateCollectionResponse,
	CreateCollectionBodyRequest,
} from '../../model/types/collectionCreateTypes';

export const createCollectionMock = http.post<
	Record<string, never>,
	CreateCollectionBodyRequest,
	CreateCollectionResponse
>(process.env.API_URL + createCollectionApiUrls.createCollection, async ({ request }) => {
	const body = (await request.json()) as CreateCollectionBodyRequest;

	const now = new Date().toISOString();

	const company = companiesMock.data.find((c) => String(c.id) === body.companyId);

	if (!company) {
		return HttpResponse.json(null, { status: 404 });
	}

	const newCollection: CreateCollectionResponse = {
		id: Date.now(),
		title: body.title,
		description: body.description,
		isFree: body.isFree,
		imageSrc: body.collectionImage || null,
		tariff: body.isFree ? 'free' : 'premium',
		createdAt: now,
		updatedAt: now,
		questionsCount: body.questions?.length || 0,
		tasksCount: body.taskIds?.length || 0,
		specializations: body.specializations?.map(
			(id) =>
				specializationsMock.data.find((spec) => spec.id === id) || {
					id,
					title: 'Unknown',
					description: 'Unknown',
				},
		),
		keywords: body.keywords || [],
		company,
		createdBy: {
			id: 'admin-uuid',
			username: 'admin',
		},
	};

	collectionsMock.data.push(newCollection);
	collectionsMock.total += 1;

	return HttpResponse.json(newCollection, { status: 201 });
});
