import { DefaultBodyType, http, HttpResponse } from 'msw';

import { calculatePagination } from '@/shared/libs';

import { collectionApiUrls } from '../../model/constants/collection';
import {
	GetCollectionKeywordsParamsRequest,
	GetCollectionKeywordsResponse,
} from '../../model/types/collection';

import { keyWordsMock } from './data';

export const collectionKeyWordsMock = http.get<
	Record<keyof GetCollectionKeywordsParamsRequest, string>,
	DefaultBodyType,
	GetCollectionKeywordsResponse
>(process.env.API_URL + collectionApiUrls.getCollectionKeywords, ({ request }) => {
	const url = new URL(request.url);
	const page = Number(url.searchParams.get('page') ?? '1');
	const limit = Number(url.searchParams.get('limit') ?? '10');
	const title = url.searchParams.get('title');

	const filteredKeyWords = [...keyWordsMock].filter((keyword) => {
		const hasSearch = title ? keyword.toLowerCase().includes(title.toLowerCase()) : true;

		return hasSearch;
	});

	const paginationData = calculatePagination(filteredKeyWords, page, limit);

	return HttpResponse.json({
		data: paginationData,
		limit,
		page,
		total: filteredKeyWords.length,
	});
});
