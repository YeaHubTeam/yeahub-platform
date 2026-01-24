import { DefaultBodyType, http, HttpResponse } from 'msw';

import { resourceApiUrls } from '../../model/constants/resource';
import { GetResourceByIdParamsRequest, GetResourceByIdResponse } from '../../model/types/resource';

import { resourcesMock } from './data';

export const resourceByIdMock = http.get<
	Record<keyof GetResourceByIdParamsRequest, string>,
	DefaultBodyType,
	GetResourceByIdResponse
>(`${process.env.API_URL}${resourceApiUrls.getResourceById}`, ({ params }) => {
	const { resourceId } = params;
	const resource = resourcesMock.data.find((r) => String(r.id) === resourceId);

	if (!resource) {
		return HttpResponse.json({} as GetResourceByIdResponse, { status: 404 });
	}

	return HttpResponse.json(resource);
});
