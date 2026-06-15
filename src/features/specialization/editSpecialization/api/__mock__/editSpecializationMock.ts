import { http, HttpResponse } from 'msw';

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
			specializationsMock[index] = {
				...specializationsMock[index],
				...body,
				updatedAt: new Date().toISOString(),
			};
		}

		return HttpResponse.json<EditSpecializationResponse>(specializationsMock[index]);
	},
);
