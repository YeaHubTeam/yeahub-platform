import { DefaultBodyType, http, HttpResponse } from 'msw';

import { resourceApiUrls } from '../../model/constants/resource';
import {
	GetMyRequestsResourcesResponse,
	GetMyRequestsResourcesParamsRequest,
} from '../../model/types/resource';

import { myRequestsMock } from './data/myRequestsMock';

export const myRequestsResoursesMock = http.get<
	Record<keyof GetMyRequestsResourcesParamsRequest, string>,
	DefaultBodyType,
	GetMyRequestsResourcesResponse
>(process.env.API_URL + resourceApiUrls.getMyRequestsResources, ({ request }) => {
	const url = new URL(request.url);
	const page = Number(url.searchParams.get('page')) || 1;
	const limit = Number(url.searchParams.get('limit')) || 10;
	const status = url.searchParams.get('status');
	const orderBy = url.searchParams.get('orderBy') || 'createdAt';
	const order = (url.searchParams.get('order') || 'desc') as 'asc' | 'desc';

	let filteredData = [...myRequestsMock.data];

	if (status) {
		filteredData = filteredData.filter((request) => request.status === status);
	}

	filteredData.sort((a, b) => {
		const aValue = a[orderBy as keyof typeof a];
		const bValue = b[orderBy as keyof typeof b];

		if (order === 'asc') {
			return String(aValue).localeCompare(String(bValue));
		} else {
			return String(bValue).localeCompare(String(aValue));
		}
	});

	const startIndex = (page - 1) * limit;
	const paginatedData = filteredData.slice(startIndex, startIndex + limit);

	return HttpResponse.json({
		data: paginatedData,
		page,
		limit,
		total: filteredData.length,
	} as GetMyRequestsResourcesResponse);
});
