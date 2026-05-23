import { DefaultBodyType, http, HttpResponse } from 'msw';

import { calculatePagination } from '@/shared/libs';

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
	const page = Number(url.searchParams.get('page') ?? 1);
	const limit = Number(url.searchParams.get('limit') ?? 10);

	const title = url.searchParams.get('title');
	const authorId = url.searchParams.get('authorId');

	const filteredSpecializations = specializationsMock.filter((specialization) => {
		const hasSearch = title
			? specialization.title.toLowerCase().includes(title.toLowerCase())
			: true;
		const hasAuthor = authorId ? specialization.createdBy?.id === authorId : true;

		return hasSearch && hasAuthor;
	});

	// let filtered = [...specializationsMock];
	//
	// if (title) {
	// 	filtered = filtered.filter((item) => item.title.toLowerCase().includes(title.toLowerCase()));
	// }
	// if (authorId) {
	// 	filtered = filtered.filter((item) => item.createdBy?.id === authorId);
	// }

	const paginationData = calculatePagination(filteredSpecializations, page, limit);

	return HttpResponse.json({
		data: paginationData,
		page,
		total: filteredSpecializations.length,
		limit,
	});
});
