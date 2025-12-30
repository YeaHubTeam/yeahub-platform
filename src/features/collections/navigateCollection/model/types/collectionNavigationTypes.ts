import { CollectionsFilterParams } from '@/entities/collection';

export type CollectionNavigation = {
	collectionId: number | string;
	filter: CollectionsFilterParams;
};
