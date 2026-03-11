import { http, HttpResponse, PathParams } from 'msw';

import { specializationsMock } from '@/entities/specialization';

import { editSpecializationApiUrls } from '../../model/constants/editSpecializationConstants';
import {
	EditSpecializationBodyRequest,
	EditSpecializationError,
	EditSpecializationResponse,
} from '../../model/types/specializationEditPageTypes';

export const editSpecializationMock = http.patch<
	PathParams,
	EditSpecializationBodyRequest,
	EditSpecializationResponse | ApiErrorData<EditSpecializationError>
>(process.env.API_URL + editSpecializationApiUrls.editSpecialization, async ({ request }) => {
	const formData = await request.json();

	if (formData.title === 'Conflict') {
		return HttpResponse.json(
			{
				message: 'specialization.specialization.title.conflict',
				statusCode: 409,
				description: 'Specialization with this title already exists',
			},
			{ status: 409 },
		);
	}

	if (formData.title === 'Error') {
		return HttpResponse.json(
			{
				message: 'tinify.tinify.resize_failed',
				statusCode: 500,
				description: 'Failed to resize image',
			},
			{ status: 500 },
		);
	}

	const specializationIndex = specializationsMock.data.findIndex((spec) => spec.id === formData.id);

	if (specializationIndex !== -1) {
		const updatedSpecialization: EditSpecializationResponse = {
			...specializationsMock.data[specializationIndex],
			...formData,
			updatedAt: new Date().toISOString(),
		};

		specializationsMock.data = specializationsMock.data.map((spec) =>
			spec.id === formData.id ? updatedSpecialization : spec,
		);

		return HttpResponse.json(updatedSpecialization);
	}

	return HttpResponse.json(
		{
			message: 'specialization.specialization.not_found',
			statusCode: 404,
			description: 'Specialization not found',
		},
		{ status: 404 },
	);
});
