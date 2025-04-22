import { CreateOrEditCollectionFormValues, Collection } from '@/entities/collection';

export type CollectionCreateFormValues = Omit<
	CreateOrEditCollectionFormValues,
	'id' | 'company' | 'createdBy'
>;

export type CreateCollectionBodyRequest = CollectionCreateFormValues;
export type CreateCollectionResponse = Collection;
