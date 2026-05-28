import { DefaultBodyType, http, HttpResponse } from 'msw';

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

	const page = url.searchParams.get('page') ?? '1';
	const limit = url.searchParams.get('limit') ?? '10';
	const title = url.searchParams.get('title');

	let filteredKeyWords: string[] = [...keyWordsMock];

	if (title) {
		const searchTitle = title.toLowerCase().trim();
		filteredKeyWords = keyWordsMock.filter((keyword) =>
			keyword.toLowerCase().includes(searchTitle),
		);
	}

	return HttpResponse.json({
		data: filteredKeyWords,
		limit: Number(limit),
		page: Number(page),
		total: filteredKeyWords.length,
	});
});
