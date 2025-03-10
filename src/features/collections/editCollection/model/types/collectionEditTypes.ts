import { Collection, CreateOrEditCollectionFormValues } from '@/entities/collection';

export type CollectionEditFormValues = CreateOrEditCollectionFormValues;
export type EditCollectionBodyRequest = CollectionEditFormValues;
export type EditCollectionResponse = Collection;
