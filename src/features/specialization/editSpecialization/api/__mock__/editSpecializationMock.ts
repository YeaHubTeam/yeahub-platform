import { http, HttpResponse } from 'msw';

import { createSlug } from '@/shared/libs';

import { specializationsMock } from '@/entities/specialization';

import { editSpecializationApiUrls } from '../../model/constants/editSpecializationConstants';
import {
	EditSpecializationBodyRequest,
	EditSpecializationResponse,
} from '../../model/types/specializationEditPageTypes';

export const editSpecializationMock = http.patch<
	{ specializationId: string },
	EditSpecializationBodyRequest,
	EditSpecializationResponse
>(
	`${process.env.API_URL}${editSpecializationApiUrls.editSpecialization}`,
	async ({ params, request }) => {
		const body = await request.json();
		const { specializationId } = params;

		const index = specializationsMock.findIndex((s) => String(s.id) === specializationId);

		if (index !== -1) {
			const updatedSpecialization: EditSpecializationResponse = {
				...specializationsMock[index],
				title: body.title,
				slug: createSlug(body.title),
				description: body.description,
				updatedAt: new Date().toISOString(),
			};
			specializationsMock[index] = updatedSpecialization;
		}

		return HttpResponse.json(specializationsMock[index]);
	},
);
