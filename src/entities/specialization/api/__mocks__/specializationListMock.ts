import { DefaultBodyType, http, HttpResponse } from 'msw';

import { specializationApiUrls } from '../../model/constants/specializationConstants';
import {
	GetSpecializationsListResponse,
	GetSpecializationsListParamsRequest,
} from '../../model/types/specialization';

import { specializationsMock } from './data';

export const specializationListMock = http.get<
	Record<keyof GetSpecializationsListParamsRequest, string>,
	DefaultBodyType,
	GetSpecializationsListResponse
>(process.env.API_URL + specializationApiUrls.getSpecializationsList, ({ request }) => {
	const url = new URL(request.url);
	const page = url.searchParams.get('page') ?? 1;
	const limit = url.searchParams.get('limit') ?? 10;

	const paginationData = specializationsMock.data.slice(
		Number(page) === 1 ? 0 : (Number(page) - 1) * Number(limit),
		Number(page) * Number(limit),
	);

	return HttpResponse.json({
		data: paginationData,
		page: Number(page),
		total: specializationsMock.total,
		limit: specializationsMock.limit,
	});
});
