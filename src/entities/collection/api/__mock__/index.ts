import { collectionByIdMock } from './collectionByIdMock';
import { collectionListMock, publicCollectionListMock } from './collectionListMock';
import { publicCollectionByIdMock } from './publicCollectionByIdMock';

export const collectionHandlers = [
	collectionListMock,
	publicCollectionListMock,
	collectionByIdMock,
	publicCollectionByIdMock,
];
