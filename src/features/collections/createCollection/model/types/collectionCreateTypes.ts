import { CreateOrEditCollectionFormValues, Collection } from '@/entities/collection';

export type CollectionCreateFormValues = Omit<CreateOrEditCollectionFormValues, 'id'>;

export type CreateCollectionBodyRequest = CollectionCreateFormValues;
export type CreateCollectionResponse = Collection;
