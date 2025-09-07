import { DefaultBodyType, http, HttpResponse } from 'msw';

import { companyApiUrls } from '../../model/constants/companyConstants';
import {
	GetCompaniesListResponse,
	GetCompaniesListParamsRequest,
} from '../../model/types/companyTypes';

import { companiesMock } from './data';

export const companyListMock = http.get<
	Record<keyof GetCompaniesListParamsRequest, string>,
	DefaultBodyType,
	GetCompaniesListResponse
>(process.env.API_URL + companyApiUrls.getCompaniesList, ({ request }) => {
	const url = new URL(request.url);
	const page = Number(url.searchParams.get('page') ?? 1);
	const limit = Number(url.searchParams.get('limit') ?? 10);

	const slice = companiesMock.data.slice((page - 1) * limit, page * limit);

	return HttpResponse.json({
		data: slice,
		page,
		total: companiesMock.total,
		limit: companiesMock.limit,
	});
});
