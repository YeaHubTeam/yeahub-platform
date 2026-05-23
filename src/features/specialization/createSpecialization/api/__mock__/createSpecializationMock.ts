import { http, HttpResponse } from 'msw';

import { author, createSlug } from '@/shared/libs';

import { Specialization, specializationsMock } from '@/entities/specialization';

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

	const newSpecialization: Specialization = {
		id: Date.now() + Math.floor(Math.random() * 1000),
		title: body.title,
		slug: createSlug(body.title),
		description: body.description,
		imageSrc: null,
		createdAt: new Date().toISOString(),
		updatedAt: null,
		createdBy: author,
	};

	specializationsMock.push(newSpecialization);

	return HttpResponse.json<CreateSpecializationResponse>(newSpecialization, { status: 201 });
});
