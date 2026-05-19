import { DefaultBodyType, http, HttpResponse } from 'msw';

import { resourceApiUrls } from '../../model/constants/resource';
import { ResourceRequest } from '../../model/types/resource';

import { resourcesRequests } from './data/resourcesRequestsMock';

export const resourceRequestByIdMock = http.get<
	Record<'requestId', string>,
	DefaultBodyType,
	ResourceRequest
>(process.env.API_URL + resourceApiUrls.getResourceRequestById, ({ params }) => {
	const { requestId } = params;
	const resource = resourcesRequests.data.find((r) => String(r.id) === requestId);

	if (!resource) {
		return HttpResponse.json({} as ResourceRequest, { status: 404 });
	}

	return HttpResponse.json(resource);
});
