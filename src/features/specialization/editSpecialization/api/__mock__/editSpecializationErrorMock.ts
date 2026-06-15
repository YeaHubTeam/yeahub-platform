import { http, HttpResponse } from 'msw';

import { editSpecializationApiUrls } from '../../model/constants/editSpecializationConstants';

export const editSpecializationErrorMock = http.patch(
	`${process.env.API_URL}${editSpecializationApiUrls.editSpecialization}`,
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
