import { http, HttpResponse } from 'msw';

import { createSpecializationApiUrls } from '../../lib/constants/createSpecializationConstants';

export const createSpecializationErrorMock = http.post(
	process.env.API_URL + createSpecializationApiUrls.createSpecialization,
	async () => {
		return HttpResponse.json(
			{
				message: 'auth.user.verified',
				statusCode: 403,
				description: 'Route is available for verified users!',
			},
			{ status: 403 },
		);
	},
);
