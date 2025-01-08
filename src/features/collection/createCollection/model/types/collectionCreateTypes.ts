import { CollectionFormValues, Collection } from '@/entities/collection';

export type CreateCollectionFormValues = Omit<CollectionFormValues, 'id'>;

export type CreateSkillBodyRequest = CreateCollectionFormValues;
export type CreateSkillResponse = Collection;
