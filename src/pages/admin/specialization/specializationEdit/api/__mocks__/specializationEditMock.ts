import { http, HttpResponse, PathParams } from 'msw';

import { specializationsMock } from '@/entities/specialization';

import { editSpecializationApiUrls } from '../../lib/constants/editSpecializationConstants';
import {
	EditSpecializationBodyRequest,
	EditSpecializationResponse,
} from '../../model/types/specializationEditPageTypes';

export const editSpecializationMock = http.patch<
	PathParams,
	EditSpecializationBodyRequest,
	EditSpecializationResponse | { error: string }
>(process.env.API_URL + editSpecializationApiUrls.editSpecialization, async ({ request }) => {
	const formData = await request.json();

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

	return HttpResponse.json({ error: 'Specialization not found' }, { status: 404 });
});
