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
	const authorId = url.searchParams.get('authorId') ?? '';

	const search = (url.searchParams.get('titleOrLegalNameOrDescriptionSearch') ?? '')
		.trim()
		.toLowerCase();

	const filtered = companiesMock.data.filter((company) => {
		const matchesSearch =
			!search ||
			[company.title, company.legalName, company.description]
				.join(' ')
				.toLowerCase()
				.includes(search);

		const matchesAuthor = !authorId || company.createdBy?.id === authorId;

		return matchesSearch && matchesAuthor;
	});

	const slice = filtered.slice((page - 1) * limit, page * limit);

	return HttpResponse.json({
		data: slice,
		page,
		total: filtered.length,
		limit,
	});
});
