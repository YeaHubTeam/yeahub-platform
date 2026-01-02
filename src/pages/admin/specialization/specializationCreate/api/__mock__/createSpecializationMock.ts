import { http, HttpResponse } from 'msw';

import { specializationsMock } from '@/entities/specialization';

import { createSpecializationApiUrls } from '../../lib/constants/createSpecializationConstants';
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
		id: Date.now() + Math.floor(Math.random() * 1000),
		title: body.title,
		description: body.description,
		imageSrc: body.imageSrc,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};

	specializationsMock.data.push(newSpecialization);
	specializationsMock.total++;

	return HttpResponse.json<CreateSpecializationResponse>(newSpecialization, { status: 201 });
});
