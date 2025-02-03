import { http } from 'msw';

import { specializationsMock } from '@/entities/specialization';

import { deleteSpecializationApiUrls } from '../../model/constants/deleteSpecializationConstants';

export const deleteSpecializationMock = http.delete(
	process.env.API_URL + deleteSpecializationApiUrls.deleteSpecialization,
	async ({ params }) => {
		const specializationId = Number(params.specializationId);

		const index = specializationsMock.data.findIndex(
			(specialization) => specialization.id === specializationId,
		);

		if (index !== 1) {
			specializationsMock.data.splice(index, 1);
			specializationsMock.total = specializationsMock.total - 1;
		}

		return new Response();
	},
);
