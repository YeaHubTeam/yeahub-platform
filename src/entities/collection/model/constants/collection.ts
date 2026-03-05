import { API_VERSION } from '@/shared/config';

export const LS_INIT_COLLECTION_ID = 'initCollectionId';

export const collectionApiUrls = {
	getCollectionsList: 'collections',
	getCollectionById: 'collections/:collectionId',
	getCollectionQuestions: 'questions?collection=:collectionId',
	getCollectionTasks: `${API_VERSION.V1}/live-coding/tasks?collectionId=:collectionId`,
	getPublicCollectionById: 'collections/:collectionId/public',
	getPublicCollectionsList: 'collections/public',
	getCollectionKeywords: 'collections/filter/keywords',
};
