import { DefaultBodyType, http, HttpResponse } from 'msw';

import { specializationProgressApiUrls } from '../../model/constants/specializationProgress';
import {
	GetSpecializationProgressResponse,
	GetSpecializationProgressParamsRequest,
} from '../../model/types/specializationProgress';

import { specializationProgressMock } from './data';

export const specializationProgressListMock = http.get<
	Record<keyof GetSpecializationProgressParamsRequest, string>,
	DefaultBodyType,
	GetSpecializationProgressResponse
>(process.env.API_URL + specializationProgressApiUrls.getGeneralProgress, ({ request }) => {
	const url = new URL(request.url);
	const page = url.searchParams.get('page') ?? 1;
	const limit = url.searchParams.get('limit');
	const specializationId = url.searchParams.get('specializationId');

	const dataBySpecializationId = specializationProgressMock.data.find((progress) => {
		return progress.specialization.id === Number(specializationId);
	});

	const paginationDate = specializationProgressMock.data.slice(
		(Number(page) - 1) * Number(limit),
		Number(page) * Number(limit),
	);

	return HttpResponse.json({
		data: dataBySpecializationId ? [dataBySpecializationId] : paginationDate,
		page: Number(page),
		total: specializationProgressMock.total,
		limit: specializationProgressMock.limit,
	});
});
