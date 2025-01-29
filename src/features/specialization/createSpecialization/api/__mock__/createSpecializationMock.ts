import { http, HttpResponse } from 'msw';

import { createSpecializationApiUrls } from '../../model/constants/createSpecializationConstants';
import {
	CreateSpecializationBodyRequest,
	CreateSpecializationResponse,
} from '../../model/types/specializationCreateTypes';

export const createSpecializationMock = http.post<
	Record<string, never>,
	CreateSpecializationBodyRequest,
	CreateSpecializationResponse
>(process.env.API_URL + createSpecializationApiUrls.createSpecialization, async ({ request }) => {
	const body = await request.json();

	const newSpecialization: CreateSpecializationResponse = {
		id: 1,
		title: body.title,
		description: body.description,
		imageSrc: body.imageSrc,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};

	return HttpResponse.json<CreateSpecializationResponse>(newSpecialization, { status: 201 });
});
