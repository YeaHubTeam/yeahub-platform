import { collectionByIdMock } from './collectionByIdMock';
import { collectionListMock, publicCollectionListMock } from './collectionListMock';
import { createCollectionMock } from './createCollectionMock';
import { publicCollectionByIdMock } from './publicCollectionByIdMock';

export const collectionHandlers = [
	collectionListMock,
	publicCollectionListMock,
	collectionByIdMock,
	publicCollectionByIdMock,
	createCollectionMock,
];
