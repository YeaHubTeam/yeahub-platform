import { DefaultBodyType, http, HttpResponse } from 'msw';

import { specializationsProgressApiUrls } from '../../model/constants/specializationsProgress';
import {
	GetSpecializationsProgressResponse,
	GetSpecializationsProgressParamsRequest,
} from '../../model/types/specializationsProgress';

import { specializationsProgressMock } from './data';

export const specializationsProgressListMock = http.get<
	Record<keyof GetSpecializationsProgressParamsRequest, string>,
	DefaultBodyType,
	GetSpecializationsProgressResponse
>(
	process.env.API_URL + specializationsProgressApiUrls.getSpecializationsGeneralProgress,
	({ request }) => {
		const url = new URL(request.url);
		const page = url.searchParams.get('page') ?? 1;
		const limit = url.searchParams.get('limit');
		const specializationId = url.searchParams.get('specializationId');

		const dataBySpecializationId = specializationsProgressMock.data.find((progress) => {
			return progress.specialization.id === Number(specializationId);
		});

		const paginationDate = specializationsProgressMock.data.slice(
			(Number(page) - 1) * Number(limit),
			Number(page) * Number(limit),
		);

		return HttpResponse.json({
			data: dataBySpecializationId ? [dataBySpecializationId] : paginationDate,
			page: Number(page),
			total: specializationsProgressMock.total,
			limit: specializationsProgressMock.limit,
		});
	},
);
