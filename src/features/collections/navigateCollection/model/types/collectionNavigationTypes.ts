import { CollectionsFilterParams } from '@/features/collections/filterCollections';

export type CollectionNavigation = {
	collectionId: number | string;
	filter: CollectionsFilterParams;
};
