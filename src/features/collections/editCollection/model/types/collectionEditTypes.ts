import { Collection, CreateOrEditCollectionFormValues } from '@/entities/collection';

export type CollectionEditFormValues = CreateOrEditCollectionFormValues;
export type EditCollectionBodyRequest = CollectionEditFormValues;
export type EditCollectionResponse = Collection;
export type EditCollectionsError =
	| 'auth.auth.unauthorized'
	| 'auth.user.verified'
	| 'auth.roles.author_can_change_only_own'
	| 'collection.collection.not_found'
	| 'tinify.tinify.compress_failed'
	| 'collection.collection.update_conflict'
	| 'storage.image.too_large'
	| 'storage.image.invalid_format'
	| 'tinify.tinify.resize_failed';
