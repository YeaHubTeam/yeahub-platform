import { DefaultBodyType, http, HttpResponse } from 'msw';

import { resourceApiUrls } from '../../model/constants/resource';
import { GetResourcesListParamsRequest, GetResourcesListResponse } from '../resourceApi';

import { resourcesMock } from './data/resourcesMock';

type ErrorResponse = {
	message: string;
	statusCode: number;
	description: string;
};

export const resourcesListMock = http.get<
	Record<keyof GetResourcesListParamsRequest, string>,
	DefaultBodyType,
	GetResourcesListResponse | ErrorResponse
>(process.env.API_URL + resourceApiUrls.getResourcesList, ({ request }) => {
	const url = new URL(request.url);
	const page = url.searchParams.get('page') ?? 1;
	const limit = url.searchParams.get('limit') ?? 10;

	const paginationData = resourcesMock.data.slice(
		(Number(page) - 1) * Number(limit),
		Number(page) * Number(limit),
	);

	if (url.searchParams.get('auth') === 'fail') {
		return HttpResponse.json(
			{ message: 'auth.auth.unauthorized', statusCode: 401, description: 'Authentication failed' },
			{ status: 401 },
		);
	}

	return HttpResponse.json({
		data: paginationData,
		page: Number(page),
		total: resourcesMock.total,
		limit: resourcesMock.limit,
	});
});
