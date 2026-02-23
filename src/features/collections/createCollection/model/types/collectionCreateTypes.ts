import { CreateOrEditCollectionFormValues, Collection } from '@/entities/collection';

export type CollectionCreateFormValues = Omit<CreateOrEditCollectionFormValues, 'id'>;

export type CreateCollectionBodyRequest = CollectionCreateFormValues;
export type CreateCollectionResponse = Collection;

export type CreateCollectionsError =
	| 'auth.auth.unauthorized'
	| 'auth.user.verified'
	| 'auth.roles.admin_or_author_required'
	| 'user.user.id.not_found'
	| 'collection.user.deleted'
	| 'collection.collection.create_conflict'
	| 'tinify.tinify.compress_failed'
	| 'tinify.tinify.resize_failed';
