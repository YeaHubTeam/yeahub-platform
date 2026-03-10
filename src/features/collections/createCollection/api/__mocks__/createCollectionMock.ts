import { http, HttpResponse } from 'msw';

import { collectionsMock } from '@/entities/collection';
import { Collection, CreateOrEditCollectionFormValues } from '@/entities/collection';

import { createCollectionApiUrls } from '../../model/constants/createCollectionConstants';

type MockCreateCollectionBody = Omit<CreateOrEditCollectionFormValues, 'id'>;
type MockCreateCollectionResponse = Collection;

export const createCollectionMock = http.post<
	Record<string, never>,
	MockCreateCollectionBody,
	MockCreateCollectionResponse
>(process.env.API_URL + createCollectionApiUrls.createCollection, async ({ request }) => {
	const body = (await request.json()) as MockCreateCollectionBody;

	const newId = Math.floor(Math.random() * 1000) + 500;
	const now = new Date().toISOString();

	const newCollection: Collection = {
		id: newId,
		title: body.title,
		description: body.description,
		isFree: body.isFree,
		imageSrc: body.collectionImage || null,
		tariff: body.isFree ? 'free' : 'premium',
		createdAt: now,
		updatedAt: now,

		questionsCount: body.questions?.length || 0,
		tasksCount: body.taskIds?.length || 0,

		specializations: (body.specializations || []).map((id: number) => ({
			id,
			title: `Specialization ${id}`,
			description: '',
		})),

		keywords: body.keywords || [],

		company: body.companyId ? { id: body.companyId, title: 'Mock Company' } : undefined,

		createdBy: {
			id: 'admin-uuid',
			username: 'admin',
		},
	};

	collectionsMock.data.unshift(newCollection);
	collectionsMock.total += 1;

	return HttpResponse.json(newCollection, { status: 201 });
});
