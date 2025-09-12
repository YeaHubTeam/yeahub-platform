import { DefaultBodyType, http, HttpResponse } from 'msw';

import type {
	GetCollectionsListParamsRequest,
	GetCollectionsListResponse,
} from '@/entities/collection/model/types/collection';

import { collectionApiUrls } from '../../model/constants/collection';

import { collectionsMock } from './data';

const createCollectionListMock = (collectionApiUrl: string) =>
	http.get<
		Record<keyof GetCollectionsListParamsRequest, string>,
		DefaultBodyType,
		GetCollectionsListResponse
	>(process.env.API_URL + collectionApiUrl, ({ request }) => {
		const url = new URL(request.url);
		const page = url.searchParams.get('page') ?? 1;
		const limit = url.searchParams.get('limit');
		const specialization = url.searchParams.get('specializations');
		const titleOrDescriptionSearch = url.searchParams.get('titleOrDescriptionSearch');

		const data = collectionsMock.data.filter((collection) => {
			const hasTitleOrDescriptionSearch = titleOrDescriptionSearch
				? collection.title.toLowerCase().includes(titleOrDescriptionSearch.toLowerCase())
				: true;

			const hasSpecialization = specialization
				? specialization
						.split(',')
						.some((spec) =>
							collection.specializations?.some(
								(collectionSpec) => String(collectionSpec.id) === spec,
							),
						)
				: true;

			return hasSpecialization && hasTitleOrDescriptionSearch;
		});

		const paginationDate = data.slice(
			(Number(page) - 1) * Number(limit),
			Number(page) * Number(limit),
		);

		return HttpResponse.json({
			data: paginationDate,
			page: Number(page),
			total: collectionsMock.total,
			limit: collectionsMock.limit,
		});
	});

export const collectionListMock = createCollectionListMock(collectionApiUrls.getCollectionsList);
export const publicCollectionListMock = createCollectionListMock(
	collectionApiUrls.getPublicCollectionsList,
);
