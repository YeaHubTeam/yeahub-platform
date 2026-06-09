import { collectionByIdMock } from './collectionByIdMock';
import { collectionKeyWordsMock } from './collectionKeyWordsMock';
import { collectionListMock, publicCollectionListMock } from './collectionListMock';
import { publicCollectionByIdMock } from './publicCollectionByIdMock';

export const collectionHandlers = [
	collectionListMock,
	publicCollectionListMock,
	collectionByIdMock,
	publicCollectionByIdMock,
	collectionKeyWordsMock,
];
