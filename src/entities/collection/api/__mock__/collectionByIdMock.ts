import { DefaultBodyType, http, HttpResponse } from 'msw';

import { collectionApiUrls } from '../../model/constants/collection';
import {
	GetCollectionByIdParamsRequest,
	GetCollectionByIdResponse,
} from '../../model/types/collection';

import { collectionsMock } from './data/collectionsMock';

export const collectionByIdMock = http.get<
	Record<keyof GetCollectionByIdParamsRequest, string>,
	DefaultBodyType,
	GetCollectionByIdResponse
>(`${process.env.API_URL}${collectionApiUrls.getCollectionById}`, ({ params }) => {
	const { collectionId } = params;
	const collection = collectionsMock.data.find((c) => String(c.id) === collectionId);

	return HttpResponse.json(collection);
});
