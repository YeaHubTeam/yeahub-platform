import { DefaultBodyType, http, HttpResponse } from 'msw';

import { resourceApiUrls } from '../../model/constants/resource';
import { GetResourceByIdParamsRequest, GetResourceByIdResponse } from '../../model/types/resource';

import { resourcesMock } from './data';

type ErrorResponse = {
	message: string;
	statusCode: number;
	description: string;
};

export const resourceByIdMock = http.get<
	Record<keyof GetResourceByIdParamsRequest, string>,
	DefaultBodyType,
	GetResourceByIdResponse | ErrorResponse
>(`${process.env.API_URL}${resourceApiUrls.getResourceById}/:resourceId`, ({ params }) => {
	const { resourceId } = params;
	const resource = resourcesMock.data.find((r) => String(r.id) === resourceId);

	if (!resource) {
		return HttpResponse.json(
			{
				message: 'externalproducts.resource_type.not_found',
				statusCode: 404,
				description: 'one or more resource types not found',
			},
			{ status: 404 },
		);
	}

	return HttpResponse.json(resource);
});
